import { getRegistryValue } from './registryHelpers';

const path = window.nodeRequire('path');
const fs = window.nodeRequire('fs');
const { remote } = window.nodeRequire('electron');
const os = window.nodeRequire('os');
const { spawn } = window.nodeRequire('child_process');

const { app } = remote;
const { arch, platform } = os;

const fsoRegistry = `\\Software\\${arch() === 'x64' ? 'WOW6432Node\\' : ''}Rhys Simpson\\FreeSO`;
const localPath = `${app.getAppPath()}${path.sep}data${path.sep}FreeSO`;

const getRegistry = async () => {
  const value = await getRegistryValue(
    'HKLM',
    fsoRegistry,
    'InstallDir'
  );

  return value;
}

const fsoInstallPath = async () => {
  let localInstall = fs.existsSync(localPath);
  if (localInstall) {
    return {
      isGlobal: !localInstall,
      value: localPath,
    };
  } else if (!localInstall && os.platform() === 'win32') {
    const globalInstall = await getRegistry();
    if (globalInstall) {
      return {
        isGlobal: true,
        value: globalInstall,
      };
    }
  }
  // Not found
  return {};
}

const hasFso = async () => {
  let localInstall = fs.existsSync(localPath);

  if (!localInstall && os.platform() === 'win32') {
    const installPath = await getRegistry();

    return (Boolean(installPath));
  } else {
    return localInstall;
  }
}

const launchFso = async (useVolcanic, _3d, useDx) => {
  const dir = await fsoInstallPath();
  const cwd = dir.value;
  const _platform = platform();

  let spawnRef;
  if (_platform === 'win32') {
    spawnRef = spawn(useVolcanic ? 'Volcanic.exe' : 'FreeSO.exe', [_3d ? '-3d' : null, useDx ? '-dx' : null],
    {
      cwd,
    }
    );
  } else {
    spawnRef = spawn(_3d ? './freeso3d.command' : './freeso.command',
    {
      cwd,
    }
    );
  }

  spawnRef.on('error', (error) => {
    console.log(error);
  });

  spawnRef.on('data', (data) => {
    console.log(data);
  });

  spawnRef.stdout.on('data', (data) => {
    console.log(data);
  });

  spawnRef.stderr.on('data', (data) => {
    console.log(data);
  });

  spawnRef.on('close', (code) => {
    console.log(code);
  });

}

export {
  fsoInstallPath,
  hasFso,
  launchFso,
};