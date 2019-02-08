const { promisify } = window.nodeRequire('util');
const { platform } = window.nodeRequire('os');
const exec = promisify(window.nodeRequire('child_process').exec);

const isRunningAsAdmin = async () => {
  const _platform = platform();
  if (_platform === 'win32') {
    try {
      await exec('NET SESSION');
      return true;
    } catch (error) {
      return false;
    }
  } else {
    const user = await exec('whoami');
    // Ubuntu seems to be appending a newline :unamused:
    return user === 'root' || user === 'root\n';
  }
};

export default isRunningAsAdmin;