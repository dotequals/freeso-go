import rootDirectory from './rootDirectory';

const { shell } = window.nodeRequire('electron');
const { join } = window.nodeRequire('path');

const { openItem } = shell;

const getDataFolder = () => {
  return join(rootDirectory(), 'data');
}

export const openDataFolder = () => {
  const dataDir = getDataFolder();
  openItem(dataDir);
}

export const openObjectsFolder = (dir) => {
  const objectsDir = join(dir, 'Content', 'Objects');
  openItem(objectsDir);
}

export const openUserFolder = (dir) => {
  const userDir = join(dir, 'Content', 'Patch', 'User');
  openItem(userDir);
}