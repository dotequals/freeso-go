const { remote } = window.nodeRequire('electron');
const { process } = remote;

export const isDarkMode = () => {
  const style = getComputedStyle(document.body);
  return style.getPropertyValue('--background') === style.getPropertyValue('--background-dark');
}

export const isSystemDarkMode = async () => {
  // TODO - Determine if this has a default for operating systems without a preference
  const useDark = remote.nativeTheme.shouldUseDarkColors;
  return useDark;
}

export const darkModeListener = (dispatch, toggleDarkMode) => {
  remote.nativeTheme.on('updated', () => {
    const useDark = remote.nativeTheme.shouldUseDarkColors;
    const isDark = isSystemDarkMode();
    if (isDark !== useDark) {
      dispatch(toggleDarkMode(useDark));
      if (process.platform === 'darwin') {
        remote.getCurrentWindow().setVibrancy(useDark ? 'dark' : 'medium-light');
      }
  }
  });
}