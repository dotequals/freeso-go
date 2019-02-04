const fs = window.nodeRequire('fs');
const path = window.nodeRequire('path');
const { spawn } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');
const { remote } = window.nodeRequire('electron');
const { app } = remote;

const localPath = `${app.getAppPath()}${path.sep}data${path.sep}Simitone`;

const hasSimitone = () => {
  let localInstall = fs.existsSync(localPath);
  
  return localInstall;
}

const simitonePath = () => {
  if (hasSimitone()) {
    return localPath;
  } else {
    return '';
  }
}

// Volcanic doesn't exist yet, but I expect something similar
// Simitone currently doesn't support switching via flag yet either
const launchSimitone = async (useVolcanic, _3d, useDx) => {
  const dir = await simitonePath();
  const cwd = dir;
  const _platform = platform();

  let spawnRef;
  if (_platform === 'win32') {
    spawnRef = spawn('Simitone.Windows.exe', [_3d ? '-3d' : null],
    {
      cwd,
    }
    );
  } else {
    spawnRef = spawn('mono Simitone.Windows.exe', [_3d ? '-3d' : null],
    {
      cwd,
      shell: true,
    }
    );
    spawnRef.unref();
  }

  spawnRef.on('error', (error) => {
    console.log(error);
  });
}

export {
  hasSimitone,
  simitonePath,
  launchSimitone,
}