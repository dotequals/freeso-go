import rootDirectory from './rootDirectory';

const { remote } = window.nodeRequire('electron');
const { join } = window.nodeRequire('path');
const { ensureDir, move, readdirSync, remove } = window.nodeRequire('fs-extra')
const { extractFull } = window.nodeRequire('node-7z');

const source = join(rootDirectory(), 'tmp');

// Recreation of 7zip-bin because executables aren't being included in builds
// https://www.npmjs.com/package/7zip-bin
const getPath = () => {
  const { process } = remote;
  const _7zip = join(rootDirectory(), 'bin', '7zip');

  if (process.env.USE_SYSTEM_7ZA) {
    return '7za';
  }
  if (process.platform === 'darwin') {
    return join(_7zip, 'mac', '7za');
  } else if (process.platform === 'win32') {
    return join(_7zip, 'win', process.arch, '7za.exe');
  } else {
    return join(_7zip, 'linux', process.arch, '7za');
  }
}

const moveFolder = async ({ sourceName, extractedName, target }) => {
  const regex = new RegExp(extractedName, 'i');
  const folderWithHash = readdirSync(source).filter(file => regex.test(file));

  await remove(target);
  await move(join(source, folderWithHash[0]), target);
  await remove(join(source, sourceName));
}

const extract = async ({ customSource, emitter, sourceName, extractedName, target, move, isTso = false }) => {
  await ensureDir(source);
  const zip = extractFull(join(source, sourceName), customSource || source, {
    $bin: getPath(),
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
      moveFolder({ sourceName, extractedName, target });
    }
  });
}

export default extract;