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

  await remove(target);
  await move(`${source}${folderWithHash[0]}`, `${target}`);
  await remove(`${source}${sourceName}`);
}

const extract = async ({ customSource, emitter, sourceName, extractedName, target, move, isTso = false }) => {

  await ensureDir(source);
  const zip = extractFull(`${source}${sourceName}`, customSource || source, {
    $bin: pathTo7Zip,
    recursive: true,
  });

  zip.on('error', (err) => {
    if (err) {
      throw err;
    }
  });

  zip.on('end', () => {
    if (isTso) {
      emitter.emit('tsoZipExtracted');
    }
    if (customSource) {
      emitter.emit('tsoCabsExtracted');
    }
    if (move) {
      console.log('hit end');
      moveFolder({ sourceName, extractedName, target });
    }
  });
}

export default extract;