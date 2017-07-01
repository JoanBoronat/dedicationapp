const electron = require('electron')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const fs = require('fs');
const Notification = require('electron-native-notification');
const settings = require('electron-settings');

// Module to control application life.
const app = electron.app
const globalShortcut = electron.globalShortcut
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let notification
let dedication = {
	current: 0,
	items: []
}

function createWindow() {

	const {width, height} = settings.get('windowBounds')
	width ? width : 800
	height ? height : 600
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width,
		height,
		icon: path.join(__dirname, 'public/images/logo-white.ico')
	})

	// and load the index.html of the app.
	mainWindow.loadURL("http://localhost:8080/"
		/*url.format({
				pathname: path.join(__dirname, 'public/index.html'),
				protocol: 'file:',
				slashes: true
			})*/
	)

	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
		app.exit(0);
	})

	mainWindow.on('resize', () => {
		// The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
		// the height, width, and x and y coordinates.
		let { width, height } = mainWindow.getBounds();
		// Now that we have them, save them using the `set` method.
		settings.set('windowBounds', { width, height });
	});

	globalShortcut.register('F1', () => {

		let {
			current: i,
			items
		} = dedication
		if (notification) notification.close();

		if (items.length == 0) {

			const opt = {
				icon: path.join(__dirname, 'public/images/logo-white.ico'),
			};

			notification = new Notification('You don\'t have any dedication items', opt);

			notification.on('show', () => {});

		} else {
			i == items.length - 1 ? i = 0 : i++;
			dedication.current = i

			const opt = {
				body: 'Press again to change',
				silent: true,
				icon: path.join(__dirname, 'public/images/logo-white.ico'),
			};

			notification = new Notification('You are working on ' + items[i], opt);

			notification.on('show', () => {});
		}

	})

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipc.on('open-file-dialog', function (event) {
	dialog.showOpenDialog({
		title: "Choose your existing dedication sheet",
		properties: ['openFile'],
		filters: [{
			name: 'Excel',
			extensions: ['xls', 'xlsx']
		}],

	}, function (files) {
		if (files) {

			settings.set('path-file', files[0]);

			const file = fs.readFileSync(files[0]);
			event.sender.send('selected-file', {
				files,
				file
			})
		}

	})
})


ipc.on('open-dir-dialog', function (event) {
	dialog.showOpenDialog({
		title: "Choose the directory to create the dedication sheet",
		properties: ['openDirectory'],


	}, function (files) {
		if (files) {

			settings.set('path-file', files[0]);

			const file = fs.readFileSync(path.join(__dirname, 'dedication.xlsx'));
			fs.createReadStream(path.join(__dirname, 'dedication.xlsx')).pipe(fs.createWriteStream(files[0] + '/dedication.xlsx'));
			event.sender.send('selected-directory', {
				files: path.join(files[0], 'dedication.xlsx'),
				file
			})
		}

	})
})


ipc.on('receive-items', (event, arg) => {
	dedication.current = 0;
	dedication.items = arg;
})

ipc.on('get-file', (event) => {
	const files = settings.get("path-file")
	const file = files ? fs.readFileSync(files) : null;
	event.sender.send('get-file', { files, file })
})