const registry = window.nodeRequire('winreg');
const path = window.nodeRequire('path');
const fs = window.nodeRequire('fs');
const { remote } = window.nodeRequire('electron');
const { app } = remote;

const ts1InstallDir = async () => {
  const { arch } = remote.process;

  const ts1Entry = new registry({
    hive: registry.HKLM,
    key: `\\Software\\${arch === 'x64' ? 'WOW6432Node\\' : ''}Maxis\\The Sims`
  });
  let installDir = '';
  await ts1Entry.values((err, items) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      items.forEach(item => {
        if (item.name === 'InstallPath') {
          installDir = item.value;
        }
      });
    }
  });

  return installDir;
}

const hasTs1 = async () => {
  let localInstall = fs.existsSync(`${app.getAppPath()}${path.sep}data${path.sep}The Sims Online`);
  let globalInstall = false;
  if (!localInstall) {
    globalInstall = await ts1InstallDir();
    console.log(globalInstall);
    return (Boolean(globalInstall));
  } else {
    return localInstall;
  }
}

export {
  ts1InstallDir,
  hasTs1,
};