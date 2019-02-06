import React, { PureComponent } from 'react';

import Icon from '../../Icon';

import { getRegistryValue } from '../../utils/registryHelpers';

import styles from '../index.module.css';

const { access, constants } = window.nodeRequire('fs-extra');
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

    this.checkDotNet = this.checkDotNet.bind(this);
    this.checkOpenAl = this.checkOpenAl.bind(this);
  }

  componentDidMount() {
    this.checkDotNet();
    this.checkOpenAl();
  }

  async checkDotNet() {
    const { setCoreDependencies, setLoading } = this.props;
    setLoading(true);
    const dotNetRelease = await getRegistryValue('HKLM', dotNetRegistry, 'Release');
    // Newer .NET releases are backwards compatible so only need this value to be at 4.6 or higher
    // https://docs.microsoft.com/en-us/dotnet/framework/migration-guide/how-to-determine-which-versions-are-installed#to-find-net-framework-versions-by-querying-the-registry-in-code-net-framework-45-and-later
    const dotNetInstalled = dotNetRelease >= 393297;
    this.setState({ dotNetInstalled });
    setCoreDependencies(dotNetInstalled);
    setLoading(false);
  }

  async checkOpenAl() {
    const { setLoading } = this.props;
    setLoading(true);
    this.setLoading = setLoading;
    let openAlInstalled;
    await access(openAlPath, constants.F_OK)
      .then(() => openAlInstalled = true)
      .catch(() => { openAlInstalled = false });

    this.setState({ openAlInstalled });
    setLoading(false);
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
    const { graphics } = this.props;
    const { dotNetInstalled, openAlInstalled } = this.state;

    return (
      <div>
        <div className={styles.installGroup}>
          <Icon name="DotNet" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">Microsoft .NET Framework</h3>
            {dotNetInstalled ? (
              <div className="subHeading">
                .NET Framework 4.5 or later is installed.
              </div>
            ) : (
              <div>
                {}
                <button onClick={this.installDotNet}>
                  Install .NET Framework
                </button>
                <button onClick={this.checkDotNet}>
                  Verify
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.installGroup}>
          <Icon name="OpenAl" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">OpenAL</h3>
            {openAlInstalled ? (
              <div className="subHeading">
                OpenAL is installed.
              </div>
            ) : (
              <div>
                <div className="subHeading">
                  {graphics !== 'OpenGL' ? 'Note: OpenAL is not used when the graphics mode is set to DirectX.' : ''}
                </div>
                <button style={{ marginTop: '1rem' }} onClick={this.installOpenAl}>
                  Install OpenAL
                </button>
                <button onClick={this.checkOpenAl}>Verify</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WindowsInstallers;