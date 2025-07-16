const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Use a writable directory for cached data to avoid Windows permission errors
const userDir = path.join(app.getPath('temp'), 'tarot-explorer');
const cacheDir = path.join(userDir, 'Cache');
fs.mkdirSync(cacheDir, { recursive: true });
app.setPath('userData', userDir);
app.setPath('cache', cacheDir);
app.commandLine.appendSwitch('disk-cache-dir', cacheDir);
app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
