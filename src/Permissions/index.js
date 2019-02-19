import React from 'react';

const Permissions = props => {
  const { fsoDir, fsoPerms, goPerms, stDir, stPerms, ts1Dir, ts1Perms, tsoDir, tsoPerms } = props;
  const goWarning = !goPerms ? (
    <div className="highlight emphasis">
      Note: FreeSO Go is currently in a restricted directory it cannot write to. Please move the folder elsewhere on your computer or run the program as Administrator.
    </div>
  ) : '';
  const gameWarnings = (tsoDir && !tsoPerms) || (fsoDir && !fsoPerms) || (ts1Dir && !ts1Perms) || (tsoDir && !tsoPerms) ? `Note: The following directories need need to be made local or ran as Administrator before they will show up in the sidebar: ${tsoDir && !tsoPerms ? 'The Sims Online, ' : ''}${fsoDir && !fsoPerms ? 'FreeSO, ' : ''}${ts1Dir && !ts1Perms ? 'The Sims 1, ': ''}${stDir && !stPerms ? 'Simitone, ' : ''}`.trim().replace(/.$/, '.') : '';
  return (
    <div>
      {goWarning}
      <div className="highlight">
        {gameWarnings}
      </div>
    </div>
  );
}

export default Permissions;