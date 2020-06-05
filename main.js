const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Create the new browser window

    let win = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    
    // and load the index.html of the app
    win.loadFile('index.html');

    // Open the DevTools
    win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

app.on('window-call-closed', () => {
    //On macOs it is common for applications and their menu bar
    // to stay active until the user quits explicitly with CMD + Q

    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    //on macOs it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
})