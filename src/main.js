const { app, BrowserWindow, Tray, Menu, nativeImage, globalShortcut, screen} = require('electron');
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

const relocateWindow = (x, y, height, width) => {
  exec(`osascript -l JavaScript ./src/change-window-size.js ${x} ${y} ${height} ${width}`, (err, stdout, stderr)=>{
    if(err){
      console.log(`stderr: ${stderr}`);
    }
  });
}

app.on('ready', () => {
  createWindow();
  createMenuBar();

  // ここからショートカットキーの定義
  let basekey = 'Command'
  // 画面サイズと位置の変更 (右) 
  globalShortcut.register(basekey + '+' + 'Right', ()=>{
    const size = screen.getPrimaryDisplay().size;
    let [x, y, height, width] = [size.width/2, 0, size.height, size.width/2];
    relocateWindow(x, y, height, width);
  });
  // 画面サイズと位置の変更 (左)
  globalShortcut.register(basekey + '+' + 'Left', ()=>{
    const size = screen.getPrimaryDisplay().size;
    let [x, y, height, width] = [0, 0, size.height, size.width/2];
    relocateWindow(x, y, height, width);
  });
  // 画面サイズと位置の変更 (上)
  globalShortcut.register(basekey + '+' + 'Up', ()=>{
    const size = screen.getPrimaryDisplay().size;
    let [x, y, height, width] = [0, 0, size.height/2, size.width];
    relocateWindow(x, y, height, width);
  });
  // 画面サイズと位置の変更 (下)
  globalShortcut.register(basekey + '+' + 'Down', ()=>{
    const size = screen.getPrimaryDisplay().size;
    let [x, y, height, width] = [0, size.height/2, size.height/2, size.width];
    relocateWindow(x, y, height, width);
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
