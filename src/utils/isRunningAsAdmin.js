const { promisify } = window.nodeRequire('util');
const { platform } = window.nodeRequire('os');
const exec = promisify(window.nodeRequire('child_process').exec);

const isRunningAsAdmin = async () => {
  const _platform = platform();
  if (_platform === 'win32') {
    try {
      const test = await exec('NET SESSION');
      window.test = test;
      return true;
    } catch (error) {
      return false;
    }
  } else {
    const user = await exec('whoami');
    return user === 'root';
  }
};

export default isRunningAsAdmin;