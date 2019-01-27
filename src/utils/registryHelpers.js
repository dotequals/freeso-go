const registry = window.nodeRequire('winreg');
const { promisifyAll } = window.nodeRequire('bluebird');

const getRegistryValue = async (hive, key, entry) => {
  const genericRegistry = new registry({
    hive: registry[hive],
    key: key
  });

  promisifyAll(genericRegistry);

  let registryEntries = await genericRegistry.valuesAsync();
  let value = '';
  registryEntries.forEach((item) => {
    if (item.name === entry) {
      value = item.value;
    }
  });

  return value;
}

export {
  getRegistryValue,
};