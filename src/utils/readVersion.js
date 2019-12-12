const { join } = window.nodeRequire('path');
const { promises } = window.nodeRequire('fs');
const { readFile } = promises;

export const readVersion = async (dir) => {
  const txtLocation = join(dir, 'version.txt');
  try {
    const version = await readFile(txtLocation, 'utf-8');
    return version.trim();
  } catch (error) {
    console.log(error);
  }
  readFile(txtLocation)
}