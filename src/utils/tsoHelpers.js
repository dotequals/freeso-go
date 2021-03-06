import { getRegistryValue } from './registryHelpers';
import rootDirectory from '../utils/rootDirectory';

const { join } = window.nodeRequire('path');
const { existsSync } = window.nodeRequire('fs-extra');
const os = window.nodeRequire('os');

const { arch } = os;
const tsoRegistry = `\\Software\\${arch() === 'x64' ? 'WOW6432Node\\' : ''}Maxis\\The Sims Online`;
const localPath = join(rootDirectory(), 'data', 'The Sims Online');

const getRegistry = async () => {
  const value = await getRegistryValue(
    'HKLM',
    tsoRegistry,
    'InstallDir'
  );

  return value;
}

const tsoInstallDir = async () => {
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
  return {
    value: '',
  };
}

const hasTso = async () => {
  let localInstall = existsSync(localPath);

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