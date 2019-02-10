import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Container from '../Container';
import Header from '../Header';
import Icon from '../Icon';
import Main from '../Main';
import NixInstallers from './NixInstallers';
import Scrollable from '../Scrollable';
import WindowsInstallers from './WindowsInstallers';

import fetchReleases from '../utils/api/fetchReleases';
import { requestRemeshData, setInstalledDate } from '../redux/remesh';
import { fsoInstallPath } from '../utils/fsoHelpers';
import { tsoInstallDir } from '../utils/tsoHelpers';
import extract from '../utils/zipHelpers';
import rootDirectory from '../utils/rootDirectory';

import styles from './index.module.css';

const { execSync } = window.nodeRequire('child_process');
const { EventEmitter } = window.nodeRequire('events');
const { createWriteStream, ensureDir, move, remove } = window.nodeRequire('fs-extra');
const request = window.nodeRequire('request');
const progress = window.nodeRequire('request-progress');
const { join } = window.nodeRequire('path');
const { platform } = window.nodeRequire('os');
const installEmitter = new EventEmitter();

class Installers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      coreDependencies: false,
      fsoInstallDir: '',
      globalFso: false,
      globalTso: false,
      hasTso: false,
      hasFso: false,
      loading: false,
      tsoInstallDir: '',
    }

    this.checkRemesh = this.checkRemesh.bind(this);
    this.setCoreDependnecies = this.setCoreDependnecies.bind(this);
    this.setHasTso = this.setHasTso.bind(this);
    this.setHasFso = this.setHasFso.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.fetchTso = this.fetchTso.bind(this);
    this.installTso = this.installTso.bind(this);
    this.fetchFso = this.fetchFso.bind(this);
    this.installFso = this.installFso.bind(this);
    this.fetchRemeshPackage = this.fetchRemeshPackage.bind(this);
    this.installRemeshPackage = this.installRemeshPackage.bind(this);
    this.renderPlatformInstallers = this.renderPlatformInstallers.bind(this);
  }

  componentDidMount() {
    this.setHasTso();
    this.setHasFso();
    this.checkRemesh();
  }

  checkRemesh() {
    const { dispatch } = this.props;
    dispatch(requestRemeshData());
  }

  setCoreDependnecies(areInstalled) {
    this.setState({ coreDependencies: areInstalled });
  }

  async setHasTso() {
    this.setLoading(true);
    const tsoInstall = await tsoInstallDir();

    this.setState({
      globalTso: tsoInstall.isGlobal,
      hasTso: Boolean(tsoInstall.value),
      tsoInstallDir: tsoInstall.value,
    });
    this.setLoading(false);
  }

  async setHasFso() {
    this.setLoading(true);
    const fsoInstall = await fsoInstallPath();

    this.setState({
      fsoInstallDir: fsoInstall.value,
      globalFso: fsoInstall.isGlobal,
      hasFso: Boolean(fsoInstall.value),
    });
    this.setLoading(false);
  }

  setLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
  
  async installRemeshPackage() {
    const { fsoInstallDir } = this.state;
    const { dispatch, remeshAvailable } = this.props;
    const target = join(fsoInstallDir, 'Content', 'MeshReplace');
    
    await extract({ 
      extractedName: 'dotequals-freeso-remesh-package',
      move: true,
      sourceName: 'MeshReplace.zip',
      target,
    });

    dispatch(setInstalledDate(remeshAvailable));
    this.setLoading(false);
  }

  async fetchRemeshPackage() {
    const { remeshAvailableUrl } = this.props;
    const options = {
      url: remeshAvailableUrl,
      headers: {
        'User-Agent': 'dotequals/freeso-go',
      }
    };
    console.log(remeshAvailableUrl);
    this.setLoading(true);
    const tmpPath = join(rootDirectory(), 'tmp');
    await ensureDir(tmpPath);
    progress(request(options), { throttle: 1e3 })
    .on('progress', (state) => {
      // console.log('Progress...');
      console.log(state);
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('end', () => {
      this.installRemeshPackage();
      // this.setLoading(false);
    })
    .pipe(createWriteStream(join(tmpPath, 'MeshReplace.zip')));
  }

  async installTso() {
    const target = join(rootDirectory(), 'data', 'The Sims Online');
    // console.log('before extraction');
    
    await extract({ 
      emitter: installEmitter,
      extractedName: 'TSO_Installer_v1.1239.1.0',
      move: false,
      sourceName: 'TSO_Installer_v1.1239.1.0.zip',
      target,
      isTso: true,
    });

    const customSource = join(rootDirectory(), 'tmp', 'The Sims Online');
    installEmitter.on('tsoZipExtracted', async () => {
      await extract({ 
        customSource,
        emitter: installEmitter,
        extractedName: 'The Sims Online',
        move: false,
        sourceName: join('TSO_Installer_v1.1239.1.0', 'Data1.cab'),
        target,
      });
      this.setLoading(false);
    });

    const patcher = join(rootDirectory(), 'bin', 'TSO-Version-Patcher');
    installEmitter.on('tsoCabsExtracted', async () => {
      execSync(`${platform() !== 'win32' ? 'mono ' : ''}TSOVersionPatcherF.exe 1239toNI.tsop "${customSource}"`, {
        cwd: patcher,
        shell: true,
      });

      move(customSource, target);
      const tsoFiles = join(rootDirectory(), 'tmp', 'TSO_Installer_v1.1239.1.0');
      remove(tsoFiles);
      remove(`${tsoFiles}.zip`);
      this.setLoading(false);
    });    
  }

  async fetchTso() {
    this.setLoading(true);

    const tmpPath = join(rootDirectory(), 'tmp');
    const tsoUrl = 'http://ia801903.us.archive.org/tarview.php?tar=/33/items/Fileplanet_dd_042006/Fileplanet_dd_042006.tar&file=042006/TSO_Installer_v1.1239.1.0.zip';
    await ensureDir(tmpPath);
    progress(request(tsoUrl), { throttle: 1e3 })
    .on('progress', (state) => {
      // console.log('Progress...');
      console.log(state);
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('end', () => {
      this.installTso();
      // this.setLoading(false);
    })
    .pipe(createWriteStream(join(tmpPath, 'TSO_Installer_v1.1239.1.0.zip')));
  }

  async installFso() {
    // const { dispatch, remeshAvailable } = this.props;
    const target = join(rootDirectory(), 'data', 'FreeSO');
    
    await extract({ 
      extractedName: 'Release',
      move: true,
      sourceName: 'FreeSO.zip',
      target,
    });

    this.setLoading(false);
  }

  async fetchFso() {
    this.setLoading(true);

    const releases = await fetchReleases('dotequals', 'FreeSO-LTR');
    const { assets } = releases[0];
    const release = platform() === 'win32' ? 'FreeSO.zip' : 'FreeSO-darwin-linux.zip';
    const tmpPath = join(rootDirectory(), 'tmp');
    let browserDownload = '';
    for (let i = 0; i < assets.length; i += 1) {
      if (assets[i].name === release) {
        browserDownload = assets[i].browser_download_url;
      } 
    }

    const options = {
      url: browserDownload,
      headers: {
        'User-Agent': 'dotequals/freeso-go',
      }
    };

    await ensureDir(tmpPath);
    progress(request(options), { throttle: 1e3 })
    .on('progress', (state) => {
      // console.log('Progress...');
      console.log(state);
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('end', () => {
      this.installFso();
      // this.setLoading(false);
    })
    .pipe(createWriteStream(join(tmpPath, 'FreeSO.zip')));
    
  }

  renderPlatformInstallers() {
    const { graphics } = this.props;
    const _platform = platform();

    if (_platform === 'win32') {
      return <WindowsInstallers graphics={graphics} setCoreDependencies={this.setCoreDependnecies} setLoading={this.setLoading} />;
    } else {
      return <NixInstallers setLoading={this.setLoading} setCoreDependencies={this.setCoreDependnecies} />;
    }
  }

  render () {
    const { remeshAvailable, remeshInstalled } = this.props;
    const { coreDependencies, fsoInstallDir, globalFso, globalTso, hasFso, hasTso, loading, tsoInstallDir } = this.state;
    const platformInstallers = this.renderPlatformInstallers();

    let remeshButtonVerb = remeshAvailable === remeshInstalled ? 'Reinstall' : 'Install';
    remeshButtonVerb = ((remeshAvailable && remeshInstalled) && (new Date(remeshAvailable) > new Date(remeshInstalled))) ? 'Update' : remeshButtonVerb;
    // const remeshAvailable = new Date();
    // const remeshInstalled = new Date(Date.now() - 8.64e7);

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    }
    const remeshAvailableString = remeshAvailable ? new Date(remeshAvailable).toLocaleString([], options) : 'N/A';
    const remeshInstalledString = remeshInstalled ? new Date(remeshInstalled).toLocaleString([], options) : 'Not Installed';
    return (
      <Container>
        <Header title="Installers" loading={loading} />
        <Scrollable>
          <Main>
            {platformInstallers}
            {
              coreDependencies ? (
                <Fragment>
                  <div className={styles.installGroup}>
                  <Icon name="TheSimsOnline" className="big" />
                  <div className={styles.installText}>
                    <h3 className="firstHeading">The Sims Online</h3>
                    {
                      hasTso ? (
                        <div className={styles.reinstallable}>
                          <div className="subHeading">
                            The Sims Online is installed. <br />
                            {tsoInstallDir}
                          </div>
                          <div className={styles.reinstall}>
                            <button>Reinstall</button>
                            {globalTso ? <button>Make Local</button> : ''}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <button onClick={this.fetchTso}>
                            Install The Sims Online
                          </button>
                          <button onClick={this.setHasTso}>
                            Verify
                          </button>
                        </div>
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
                      <div className={styles.reinstallable}>
                        <div className="subHeading">
                          FreeSO is installed. <br />
                          {fsoInstallDir}
                        </div>
                        <div className={styles.reinstall}>
                          <button>Reinstall</button>
                          {globalFso ? <button>Make Local</button> : ''}
                        </div>
                      </div>
                      ) : (
                        <div>
                          <button onClick={this.fetchFso}>
                            Install FreeSO
                          </button>
                          <button onClick={this.setHasFso}>
                            Verify
                          </button>
                        </div>
                      )
                    }
                  </div>
                </div>
                { hasFso ? (
                  <div className={styles.installGroup}>
                    <Icon name="RemeshPackage" className="big" />
                    <div className={styles.installText}>
                      <h3 className="firstHeading">Remesh Package</h3>
                      <div className={styles.reinstallable}>
                        <div>
                          <div className="subText">
                          <span className={remeshButtonVerb === 'Update' ? 'highlight' : ''}>Latest Available: {remeshAvailableString}</span>
                          </div>
                          <div className="">
                            Latest Installed: {remeshInstalledString}
                          </div>
                        </div>
                        <div className={styles.reinstall}>
                          <button onClick={this.fetchRemeshPackage}>{remeshButtonVerb} Remesh Package</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : '' }
              </Fragment>
              ) : ''
            }
          </Main>
        </Scrollable>
      </Container>
    );
  }
};

const mapStateToProps = state => (
  {
    graphics: state.settings.graphics,
    remeshAvailable: state.remesh.available,
    remeshAvailableUrl: state.remesh.availableUrl,
    remeshInstalled: state.remesh.installed,
  }
);

export default connect(mapStateToProps)(Installers);