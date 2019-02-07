import { getRegistryValue } from './registryHelpers';
import rootDirectory from './rootDirectory';

const { join } = window.nodeRequire('path');
const { existsSync } = window.nodeRequire('fs-extra');
const os = window.nodeRequire('os');
const { spawn } = window.nodeRequire('child_process');

const { arch, platform } = os;

const fsoRegistry = `\\Software\\${arch() === 'x64' ? 'WOW6432Node\\' : ''}Rhys Simpson\\FreeSO`;
const localPath = join(rootDirectory(), 'data', 'FreeSO');

const getRegistry = async () => {
  const value = await getRegistryValue(
    'HKLM',
    fsoRegistry,
    'InstallDir'
  );

  return value;
}

const fsoInstallPath = async () => {
  let localInstall = existsSync(localPath);
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
  let localInstall = existsSync(localPath);

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