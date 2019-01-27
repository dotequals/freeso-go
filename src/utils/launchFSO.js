const { remote } = window.nodeRequire('electron');
const { app } = remote;
const { exec } = window.nodeRequire('child_process');
const path = window.nodeRequire('path');
const os = window.nodeRequire('os');

// volcanic, 3d, graphics
const launchFSO = () => {
  const platform = os.platform();
  if (platform === 'win32') {

  } else if (platform === 'darwin') {

  } else {

  }
  switch (os.platform) {
    case 'win32':
      
      break;
    case 'darwin':
      break;
    default:
      break;
  }
// Windows: 
// Local: `${app.getAppPath()}${path.sep}data${path.sep}FreeSO`
// Global: Computer\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Rhys Simpson\FreeSO
// Mac: `${app.getAppPath()}${path.sep}data${path.sep}freeso.command` or freeso3d.command
// Linux: `${app.getAppPath()}${path.sep}data${path.sep}FreeSO` or freeso3d.command
}

export default launchFSO;