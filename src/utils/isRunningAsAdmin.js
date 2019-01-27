const { exec } = window.nodeRequire('child_process')

const isRunningAsAdmin = async () => {
  const { stderr } = await exec('NET SESSION');
  return stderr.length === 0;
};

export default isRunningAsAdmin;