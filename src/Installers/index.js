import React, { PureComponent } from 'react';

import Header from '../Header';
import Icon from '../Icon';
import NixInstallers from './NixInstallers';
import WindowsInstallers from './WindowsInstallers';

import { fsoInstallPath } from '../utils/fsoHelpers';
import { tsoInstallDir } from '../utils/tsoHelpers';

import styles from './index.module.css';

const fs = window.nodeRequire('fs');
const path = window.nodeRequire('path');
const { exec } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');
const { remote } = window.nodeRequire('electron');
const { app } = remote;

class Installers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fsoInstallDir: '',
      hasTso: false,
      hasFso: false,
      tsoInstallDir: '',
    }
  }

  async componentDidMount() {
    const tsoInstall = await tsoInstallDir();
    const fsoInstall = await fsoInstallPath();

    this.setState({
      fsoInstallDir: fsoInstall.value,
      hasFso: Boolean(fsoInstall.value),
      hasTso: Boolean(tsoInstall.value),
      tsoInstallDir: tsoInstall.value,
    });
  }

  renderPlatformInstallers() {
    const _platform = platform();

    if (_platform === 'win32') {
      return <WindowsInstallers />;
    } else {
      return <NixInstallers />;
    }
  }

  render () {
    const { fsoInstallDir, hasFso, hasTso, tsoInstallDir } = this.state;
    const platformInstallers = this.renderPlatformInstallers();
    return (
      <div>
        <Header title="Installers" />
        {platformInstallers}
        <div className={styles.installGroup}>
          <Icon name="TheSimsOnline" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">The Sims Online</h3>
            {
              hasTso ? (
              <div className="subHeading">
                You have The Sims Online installed. <br />
                {tsoInstallDir}
              </div>
              ) : (
                <button>
                  Install The Sims Online
                </button>
              )
            }
          </div>
        </div>
        <div className={styles.installGroup}>
          <Icon name="FsoOutline" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">FreeSO</h3>
            {
              hasFso ? (
              <div className="subHeading">
                You have FreeSO installed. <br />
                {fsoInstallDir}
              </div>
              ) : (
                <button>
                  Install FreeSO
                </button>
              )
            }
          </div>
        </div>
        <div className={styles.installGroup}>
          <Icon name="RemeshPackage" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">Remesh Package</h3>
            <div className="subHeading">
              Latest Available: {new Date().toLocaleString()}
            </div>
            <div className="">
              Latest Installed: Never
            </div>
          </div>
          <div className={styles.reinstall}>
            <button>Install</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Installers;