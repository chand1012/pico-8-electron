const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
let win
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 550, height: 675}) //nearly perfect for a pico8 game
  win.setMenu(null)
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.executeJavaScript(`require("./game.js")`); // this is what executes the js in electron
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
