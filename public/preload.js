// const { remote } = require('electron');
// const Registry = require('winreg');

// const { systemPreferences } = remote;

// const isDarkMode = () => {
//   let isDark;
//   if (process.platform === 'darwin') {
//     isDark = systemPreferences.isDarkMode();
//   } else if (process.platform === 'win32') {
//     const regKey = new Registry({
//       hive: Registry.HKCU,
//       key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize'
//     });
//     regKey.values((err, items) => {
//       if (err) {
//         console.log(err);
//       } else {
//         items.forEach((item) => {
//           if (item.name === 'AppsUseLightTheme') {
//             // Dark mode: 0, Light mode: 1
//             isDark = Number.parseInt(item.value) === 0;
//           }
//         });
//       }
//     });
//     isDark = true;
//   }

//   window.isDarkMode = isDark || false;
// }

// if (process.platform === 'darwin') {
//   systemPreferences.subscribeNotification(
//     'AppleInterfaceThemeChangedNotification',
//     isDarkMode,
//   );
// }

// isDarkMode();