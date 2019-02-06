import rootDirectory from './rootDirectory';

const { join } = window.nodeRequire('path');
const { exec } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');
const { remote } = window.nodeRequire('electron');

const launchDataFolder = () => {
  const cwd = join(rootDirectory(), 'data');
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