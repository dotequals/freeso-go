const { remote } = window.nodeRequire('electron');
const { join } = window.nodeRequire('path');
const isDev = window.nodeRequire('electron-is-dev');

const rootDirectory = () => {
  if (remote.process.platform === 'darwin' && !isDev) {
    return join(remote.app.getAppPath(), '..', '..', '..', '..');
  } else if (remote.process.platform === 'linux' && !isDev) {
    return join(remote.process.env.APPIMAGE, '..');
  }
  return remote.process.env.PORTABLE_EXECUTABLE_DIR || remote.app.getAppPath();
}

export default rootDirectory;