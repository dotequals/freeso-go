const { remote } = window.nodeRequire('electron');

const rootDirectory = () => {
  return remote.process.env.PORTABLE_EXECUTABLE_DIR || remote.app.getAppPath();
}

export default rootDirectory;