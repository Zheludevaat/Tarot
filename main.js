const { app, BrowserWindow } = require('electron');
const path = require('path');

// Use a writable directory for cached data to avoid Windows permission errors
const userDir = path.join(app.getPath('temp'), 'tarot-explorer');
app.setPath('userData', userDir);
app.commandLine.appendSwitch('disk-cache-dir', path.join(userDir, 'Cache'));
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
