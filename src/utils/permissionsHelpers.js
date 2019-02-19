import { toggleFsoPerms, toggleTsoPerms, toggleTs1Perms, toggleGoPerms } from '../redux/installed';
import rootDirectory from '../utils/rootDirectory';

const { platform } = window.nodeRequire('os');
const { spawn } = window.nodeRequire('child_process');
const { access, constants } = window.nodeRequire('fs');
const { R_OK, W_OK, X_OK } = constants;

// FullControl, Modify, ReadAndExecute
// Modify contains every right that full control does, except for Change Permission and Take Ownership.
const dispatchAction = (dispatch, key, found) => {
  switch (key) {
    case 'fsoPerms':
      dispatch(toggleFsoPerms(found));
      break;
    case 'goPerms':
      dispatch(toggleGoPerms(found));
      break;
    case 'tsoPerms':
      dispatch(toggleTsoPerms(found));
      break;
    case 'ts1Perms':
      dispatch(toggleTs1Perms(found));
      break;
    default:
      console.log(`Invalid key: ${key}`);
      break;
  }
}

const winPossiblePermissions = (lowestPermission) => {
  switch (lowestPermission) {
    case 'ReadAndExecute':
      return ['ReadAndExecute', 'Modify', 'FullControl'];
    case 'Modify':
      return ['Modify', 'FullControl'];
    case 'FullControl':
      return ['FullControl'];
    default:
      return [];
  }
}

const hasPermissions = async ({ dispatch, key, path, permissions }) => {
  const _platform = platform();

  if (_platform === 'win32') {
    const command = `Get-Acl "${path}" | Select-Object -ExpandProperty Access | Where-Object {$_.IdentityReference -eq (whoami) -or $_.IdentityReference -eq "BUILTIN\\Users"} | Select-Object -ExpandProperty FileSystemRights`;
    const spawnRef = spawn('powershell.exe', [command], {});
    let output = '';
    spawnRef.stdout.on('data', (data) => {
      output += data.toString().replace(/,/g, '');
    });
    spawnRef.on('close', (code) => {
      let acl = new Set(output.trim().split(/\s/));
      acl.delete('');
      acl = [...acl];
      const found = winPossiblePermissions(permissions).some(perm => acl.includes(perm));
      dispatchAction(dispatch, key, found);
    });
  } else {
    // Everything is self-contained so we can use goDir for everything
    access(rootDirectory(), R_OK | W_OK | X_OK, (err) => {
      if (err) {
        dispatchAction(dispatch, key, false);
      } else {
        dispatchAction(dispatch, key, true);
      }
    });
    
  }
}

export {
  hasPermissions,
}