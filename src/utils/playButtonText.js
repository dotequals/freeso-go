const playButtonText = (newGameDir, newGamePerms, oldGameDir, oldGamePerms) => {
  if (newGameDir && newGamePerms && oldGameDir && oldGamePerms) {
    return 'Play';
  } else if (!newGameDir && !oldGameDir) {
    return 'Install';
  } else if (!newGameDir || !oldGameDir) {
    return 'Finish Install';
  } else if (!newGamePerms || !oldGamePerms) {
    return 'Insufficient Privileges';
  }
  return 'Install';
}

export default playButtonText;