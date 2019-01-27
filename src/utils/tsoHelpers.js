import { getRegistryValue } from './registryHelpers';

const path = window.nodeRequire('path');
const fs = window.nodeRequire('fs');
const { remote } = window.nodeRequire('electron');
const { app } = remote;
const os = window.nodeRequire('os');

const { arch } = os;
const tsoRegistry = `\\Software\\${arch() === 'x64' ? 'WOW6432Node\\' : ''}Maxis\\The Sims Online`;
const localPath = `${app.getAppPath()}${path.sep}data${path.sep}The Sims Online`;

const getRegistry = async () => {
  const value = await getRegistryValue(
    'HKLM',
    tsoRegistry,
    'InstallDir'
  );

  return value;
}

const tsoInstallDir = async () => {
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

const hasTso = async () => {
  let localInstall = fs.existsSync(`${app.getAppPath()}${path.sep}data${path.sep}The Sims`);

  if (!localInstall && os.platform() === 'win32') {
    const installPath = await getRegistry();

    return (Boolean(installPath));
  } else {
    return localInstall;
  }
}

export {
  tsoInstallDir,
  hasTso,
};