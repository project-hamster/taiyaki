const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
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
    {label:'終了', type:'normal', role:'quit'},
    {label:'ヘルプ', type:'normal', role:'help'}
  ]);
  
  tray.setContextMenu(contextMenu);
}

app.on('ready', () => {
  createWindow();
  createMenuBar();
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
