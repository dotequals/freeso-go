import rootDirectory from './rootDirectory';

const { existsSync } = window.nodeRequire('fs-extra');
const { join } = window.nodeRequire('path');
const { spawn } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');

const localPath = join(rootDirectory(), 'data', 'Simitone');

const hasSimitone = () => {
  let localInstall = existsSync(localPath);
  
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