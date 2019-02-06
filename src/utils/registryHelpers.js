const registry = window.nodeRequire('winreg');
const { promisifyAll } = window.nodeRequire('bluebird');

const getRegistryValue = async (hive, key, entry) => {
  const genericRegistry = new registry({
    hive: registry[hive],
    key: key
  });

  // util.promisify isn't enough for this one
  // https://github.com/fresc81/node-winreg/issues/38
  promisifyAll(genericRegistry);

  try {
    let registryEntries = await genericRegistry.valuesAsync();
    let value = '';
    registryEntries.forEach((item) => {
      if (item.name === entry) {
        value = item.value;
      }
    });

    return value;
  } catch (e) {
    return undefined;
  }
}

export {
  getRegistryValue,
};