const { shell } = window.nodeRequire('electron');
const { exec } = window.nodeRequire('child_process');
const path = window.nodeRequire('path');
const os = window.nodeRequire('os');
const fs = window.nodeRequire('fs');
const sysInfo = window.nodeRequire('systeminformation');

const launchScreenshotTool = async () => {
  const platform = os.platform();

  if (platform === 'win32') {
    const hasPowershell = fs.existsSync(`C:${path.sep}Windows${path.sep}System32${path.sep}WindowsPowerShell${path.sep}v1.0${path.sep}powershell.exe`);
    if (hasPowershell) {
      exec('powershell.exe -Command Get-AppxPackage -Name Microsoft.ScreenSketch', (_, sto) =>{
        if (sto) {
          exec('start ms-screensketch:');
        } else {
          exec('SNIPPINGTOOL');
        }
      });
    } else {
      exec('SNIPPINGTOOL');
    }
  } else if (platform === 'darwin') {
    const osInfo = await sysInfo.osInfo();
    const { release } = osInfo;
    // [major, minor, patch]
    const version = release.split('.');
    const app = version[1] >= 14? 'Screenshot.app' : 'Grab.app';
    exec(`open -a ${app}`);
    // shell.openExternal('https://support.apple.com/en-us/HT201361');
  } else {
    const osInfo = await sysInfo.osInfo();
    const { distro } = osInfo;
    const encodeDistro = distro.replace(' ', '+');
    shell.openExternal(`https://google.com?q=how+to+take+a+screenshot+on+${encodeDistro}`);
  }
}

export default launchScreenshotTool;