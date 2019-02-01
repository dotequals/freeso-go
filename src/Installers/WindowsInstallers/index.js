import React, { PureComponent } from 'react';

import Icon from '../../Icon';

import { getRegistryValue } from '../../utils/registryHelpers';

import styles from '../index.module.css';

const fs = window.nodeRequire('fs');
const path = window.nodeRequire('path');
const { exec } = window.nodeRequire('child_process');
const { remote } = window.nodeRequire('electron');
const { app } = remote;

const dotNetRegistry = '\\Software\\Microsoft\\NET Framework Setup\\NDP\\v4\\Full';
const { windir } = remote.process.env;
const openAlPath = `${windir}\\System32\\OpenAL32.dll`;

class WindowsInstallers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dotNetInstalled: false,
      openAlInstalled: false,
    }
  }

  async componentDidMount() {
    const dotNetRelease = await getRegistryValue('HKLM', dotNetRegistry, 'Release');
    // Newer .NET releases are backwards compatible so only need this value to be at 4.6 or higher
    // https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed#to-find-net-framework-versions-by-querying-the-registry-in-code-net-framework-45-and-later
    const dotNetInstalled = dotNetRelease >= 393297;
    const openAlInstalled = fs.existsSync(openAlPath);

    this.setState({
      dotNetInstalled,
      openAlInstalled,
    });
  }

  installDotNet() {
    exec(`${app.getAppPath()}${path.sep}bin${path.sep}NDP46-KB3045560-Web.exe`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  installOpenAl() {
    exec(`${app.getAppPath()}${path.sep}bin${path.sep}oalinst.exe`, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  render() {
    const { dotNetInstalled, openAlInstalled } = this.state;

    return (
      <div>
        <div className={styles.installGroup}>
          <Icon name="DotNet" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">Microsoft .NET Framework</h3>
            {dotNetInstalled ? (
              <div className="subHeading">
                You have .NET Framework 4.5 or later installed.
              </div>
            ) : (
              <button onClick={this.installDotNet}>
                Install .NET Framework
              </button>
            )}
          </div>
        </div>
        <div className={styles.installGroup}>
          <Icon name="OpenAl" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">OpenAL (used with OpenGL)</h3>
            {openAlInstalled ? (
              <div className="subHeading">
                You have OpenAL installed.
              </div>
            ) : (
              <div>
                <div className="subHeading">
                  {true || true ? 'Note: OpenAL is not used when your graphics mode is set to DirectX.' : ''}
                </div>
                <button style={{ marginTop: '1rem' }} onClick={this.installOpenAl}>
                  Install OpenAL
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WindowsInstallers;