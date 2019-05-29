const electron = require('electron')
// Главный контроллер приложения
const app = electron.app

// Создаем меню
// const Menu = electron.Menu

// Создаем окно браузера
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// app.on('ready', () => {
//   createWindow()
// })

// Создаем PHP сервер /////
const PHPServer = require('php-server-manager');

const server = new PHPServer({
    port: 7676,
    directory: __dirname,
    directives: {
        display_errors: 0,
        expose_php: 0
    }
});


// Глобально обьявляем переменную главного окна
let mainWindow

function createWindow () {

  server.run();
  // Создаем окно браузера
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // Слушаем запушенный сервер php
  mainWindow.loadURL('http://'+server.host+':'+server.port+'/')

/* Это используем только с index.html

mainWindow.loadURL(url.format({
  pathname: path.join(__dirname, 'index.php'),
  protocol: 'file:',
  slashes: true
}))
*/
 // const {shell} = require('electron')
 // shell.showItemInFolder('fullPath')

  // Включить DeBug.
  // mainWindow.webContents.openDevTools()

  // Event при закрытии окна
  mainWindow.on('closed', function () {
    // Закрываем php сервер
    server.close();
    mainWindow = null;
  })
}

// Этот метод будет вызван, когда Electron отработает
// Проинициализируется и будет готов к созданию окон браузера.
// Некоторые API можно использовать только после этого события.

app.on('ready', createWindow)

// Выходим если все окна были закрыты
app.on('window-all-closed', function () {
  // Киляем PHP Server

  // if (process.platform !== 'darwin') {
    server.close();
    app.quit();
  // }
})

app.on('activate', function () {
//Если приложение активно, но окно упало, запускаем повторно
  if (mainWindow === null) {
    createWindow()
  }
})
