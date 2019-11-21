import React from 'react';

import styles from './index.module.css';

const Permissions = props => {
  const { fsoDir, fsoPerms, goPerms, stDir, stPerms, ts1Dir, ts1Perms, tsoDir, tsoPerms } = props;
  const goWarning = !goPerms ? 'FreeSO Go is currently in a restricted directory it cannot write to. Please move the folder elsewhere on your computer or run the program as Administrator.' : '';
  const gameWarnings = (tsoDir && !tsoPerms) || (fsoDir && !fsoPerms) || (ts1Dir && !ts1Perms) || (tsoDir && !tsoPerms) ? `Please run FreeSO Go as Administrator or click "Make Local" on the Installers tab to enable the following: ${tsoDir && !tsoPerms ? 'The Sims Online, ' : ''}${fsoDir && !fsoPerms ? 'FreeSO, ' : ''}${ts1Dir && !ts1Perms ? 'The Sims 1, ': ''}${stDir && !stPerms ? 'Simitone, ' : ''}`.trim().replace(/.$/, '.') : '';
  return (goWarning || gameWarnings) ? (
    <div>
      <div className={styles.default}>
        {goWarning || gameWarnings}
      </div>
    </div>
  ) : '';
}

export default Permissions;