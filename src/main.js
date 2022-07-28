const { app, BrowserWindow, Tray, Menu, nativeImage, globalShortcut } = require('electron');
const {exec} = require('child_process');
const path = require('path');
let tray;


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: false
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

const createMenuBar = () => {
  let icon = nativeImage.createFromPath(path.join(__dirname, 'images/taiyaki.png'));
  icon = icon.resize({height:18,width:18});

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
  ]);
  
  tray.setContextMenu(contextMenu);
}

app.on('ready', () => {
  createWindow();
  createMenuBar();

  globalShortcut.register('Command+Right', ()=>{
    exec('osascript -l JavaScript ./src/change-window-size.js', (err, stdout, stderr)=>{
      if(err){
        console.log(`stderr: ${stderr}`);
      }
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
