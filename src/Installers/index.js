import React from 'react';

import Header from '../Header';

const fs = window.nodeRequire('fs');
const { exec, spawn } = window.nodeRequire('child_process');
const registry = window.nodeRequire('winreg');

// HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full
// Version REG_SZ 4.7.03190

const Installers = () => {
  exec('NET SESSION', (_, __, se) => se.length === 0 ? console.log('admin') : console.log('not admin'));

  const dotNet = new registry({
    hive: registry.HKLM,
    key: '\\Software\\Microsoft\\NET Framework Setup\\NDP\\v4\\Full'
  });

  // const dotNet = new registry({
  //   hive: RegistryValueType.HKCU,
  //   key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize'
  // });

  // 
  let dotNetInstalled = false;
  dotNet.values((err, items) => {
    if (err) {
      console.log(err);
    } else {
      items.forEach((item) => {
        if (item.name === 'Release') {
          // Newer .NET releases are backwards compatible so only need this value to be at 4.6 or higher
          // https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed#to-find-net-framework-versions-by-querying-the-registry-in-code-net-framework-45-and-later
          dotNetInstalled = Number.parseInt(item.value) >= 393297;
          console.log(`.NET? ${dotNetInstalled}`);
        }
      });
    }
  });

  console.log(`.NET? ${dotNetInstalled}`);

  const theSimsOnline = new registry({
    
  });

  const windowsPath = 'C:\\Windows\\';
  // returned true, but only needed for OGL :thinking:
  console.log(fs.existsSync(`${windowsPath}SysWOW64\\OpenAL32.dll`) || fs.existsSync(`${windowsPath}System32\\OpenAL32.dll`))
  return (
    <div>
      <Header title="Installers" />
    </div>
  );
};

export default Installers;