import { getRegistryValue } from './registryHelpers';
import rootDirectory from './rootDirectory';

const { join } = window.nodeRequire('path');
const { existsSync } = window.nodeRequire('fs-extra');
const os = window.nodeRequire('os');

const { arch } = os;
const ts1Registry = `\\Software\\${arch() === 'x64' ? 'WOW6432Node\\' : ''}Maxis\\The Sims`;
const localPath = join(rootDirectory(), 'data', 'The Sims');

const getRegistry = async () => {
  const value = await getRegistryValue(
    'HKLM',
    ts1Registry,
    'InstallPath'
  );

  return value;
}

const ts1InstallPath = async () => {
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

const hasTs1 = async () => {
  let localInstall = existsSync(localPath);

  if (!localInstall && os.platform() === 'win32') {
    const installPath = await getRegistry();

    return (Boolean(installPath));
  } else {
    return localInstall;
  }
}

export {
  ts1InstallPath,
  hasTs1,
};