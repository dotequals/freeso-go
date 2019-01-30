const path = window.nodeRequire('path');
const { exec } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');
const { remote } = window.nodeRequire('electron');
const { app } = remote;

const launchDataFolder = () => {
  const cwd = `${app.getAppPath()}${path.sep}data`;
  const _platform = platform();

  if (_platform === 'win32') {
    exec(`explorer .`,
    {
      cwd,
    }
    );
  } else if (_platform === 'darwin') {
    exec('open .',
    {
      cwd,
    }
    );
  } else {
    exec('xdg-open .',
    {
      cwd,
    }
    );
  }
}

export default launchDataFolder;