const Promise = window.nodeRequire('bluebird');
const exec = Promise.promisify(window.nodeRequire('child_process').exec);
// const { exec } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');

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
    return user === 'root';
  }
};

export default isRunningAsAdmin;