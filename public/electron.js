const { app, BrowserWindow, shell, ipcMain, TouchBar } = require('electron');
// const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

const path = require('path');
const isDev = require('electron-is-dev');
const fixPath = require('fix-path');

let mainWindow;

createWindow = () => {
	mainWindow = new BrowserWindow({
    frame: false,
    height: 768,
    minHeight: 768,
    minWidth: 1024,
    titleBarStyle: 'hiddenInset',
    transparent: true,
		webPreferences: {
      webSecurity: false,
			nodeIntegration: true,
		},
		width: 1024,
  });

	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`,
  );

	if (isDev) {
    // TODO - Maybe enable this again... eventually
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS,
		} = require('electron-devtools-installer');

		installExtension(REACT_DEVELOPER_TOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});

		installExtension(REDUX_DEVTOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});
  }

  const openBrowser = (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  };

  const { webContents } = mainWindow;
  // The launcher isn't multi-windowed so this is okay
  webContents.on('new-window', openBrowser);

	mainWindow.once('ready-to-show', () => {
    mainWindow.show();

		ipcMain.on('open-external-window', (event, arg) => {
			shell.openExternal(arg);
    });
	});
};

// Finder launched applications don't get the same path a user does
// Without this mono will fail to be found
if (process.platform === 'darwin') {
  fixPath();
}

// Fixes an issue where pinned shortcut opens multiple instances on Windows
app.setAppUserModelId('org.freeso.go');
const unlocked = app.requestSingleInstanceLock();

if (!unlocked) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
}

app.on('ready', () => {
	createWindow();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('load-page', (event, arg) => {
	mainWindow.loadURL(arg);
});