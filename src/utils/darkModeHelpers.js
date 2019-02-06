import { getRegistryValue } from './registryHelpers';

const { remote } = window.nodeRequire('electron');
const { process, systemPreferences } = remote;


export const isDarkMode = () => {
  const style = getComputedStyle(document.body);

  return style.getPropertyValue('--background') === style.getPropertyValue('--background-dark');
}

export const isSystemDarkMode = async () => {
  if (process.platform === 'darwin') {
    return systemPreferences.isDarkMode();
  } else if (process.platform === 'win32') {
    // Dark mode: 0, Light mode: 1
    const registry = await getRegistryValue('HKCU', '\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize', 'AppsUseLightTheme');
    const asNumber = Number.parseInt(registry);
    return asNumber === 0;
  }

  // Until linux has a standard OS variable
  return false;
}

export const darkModeListener = (dispatch, toggleDarkMode) => {
  if (process.platform === 'darwin') {
    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      async () => {
        const isDark = await isSystemDarkMode();
        remote.getCurrentWindow().setVibrancy(isDark ? 'dark' : 'medium-light');
        dispatch(toggleDarkMode(isDark));
      }
    );
  }
}