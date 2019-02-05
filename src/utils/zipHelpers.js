const { remote } = window.nodeRequire('electron');
const path = window.nodeRequire('path');
const { ensureDir, move, readdirSync, remove } = window.nodeRequire('fs-extra')
const _7bin = window.nodeRequire('7zip-bin');
const { extractFull } = window.nodeRequire('node-7z');

const { app } = remote;
const pathTo7Zip = _7bin.path7za;

const source = `${app.getAppPath()}${path.sep}tmp${path.sep}`;

const moveFolder = async ({ sourceName, extractedName, target }) => {
  const regex = new RegExp(extractedName, 'i');
  const folderWithHash = readdirSync(source).filter(file => regex.test(file));

  await move(`${source}${folderWithHash[0]}`, `${target}`);
  await remove(`${source}${sourceName}`);
}

const extract = async ({ sourceName, extractedName, target }) => {

  await ensureDir(source);
  await remove(`${target}`);
  const zip = extractFull(`${source}${path.sep}${sourceName}`, source, {
    $bin: pathTo7Zip,
  });

  zip.on('error', (err) => {
    if (err) {
      throw err;
    }
  });

  zip.on('end', () => {
    moveFolder({ sourceName, extractedName, target });
  });
}

export default extract;