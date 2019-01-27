import React, { PureComponent } from 'react';

import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Container from '../Container';
import Main from '../Main';
import Scrollable from '../Scrollable';

import isRunningAsAdmin from '../utils/isRunningAsAdmin';
import launchScreenshotTool from '../utils/launchScreenshotTool';

import styles from './index.module.css';

const sysInfo = window.nodeRequire('systeminformation');
const clipboardy = window.nodeRequire('clipboardy');
const { remote } = window.nodeRequire('electron');

const bytesToGB = (bytes) => (Math.ceil(bytes / Math.pow(1024, 3)));
const kbToGB = (kb) => (Math.ceil(kb / 1024));

class Advanced extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      profile: '',
      includeFilePaths: false,
    };

    this.toggleFilePaths = this.toggleFilePaths.bind(this);
    this.copyProfile = this.copyProfile.bind(this);
    this.requestProfile = this.requestProfile.bind(this);
  }

  openDevTools() {
    remote.getCurrentWindow().openDevTools({ mode: 'undocked' })
  }

  toggleFilePaths() {
    const { includeFilePaths } = this.state;
    this.setState({ includeFilePaths: !includeFilePaths });
  }

  async buildProfile() {
    const cpu = await sysInfo.cpu();
    const mem = await sysInfo.mem();
    const os = await sysInfo.osInfo();
    const graphics = await sysInfo.graphics();

    console.log(os);

    const ram = bytesToGB(mem.total);
    let gpus = '';
    graphics.controllers.forEach((gpu, index) => {
      gpus += `GPU #${index + 1}: ${gpu.model} VRAM: ${kbToGB(gpu.vram)}GB\n`;
    });
    const isAdmin = await isRunningAsAdmin();
  
    const profile = 
`${isAdmin ? 'Running' : 'Not running'} FreeSO Launcher Go as Administrator

CPU: ${cpu.speed}GHz ${cpu.cores} core ${cpu.manufacturer} ${cpu.brand}
RAM: ${ram}GB
OS: ${os.distro} ${os.release} (${os.arch === 'x64' ? '64 bit' : '32 bit'})
${gpus}

The Sims Registry InstallPath: 
Simitone: 
The Sims Online Registry InstallPath:
FreeSO:

Graphics Mode:
3D Mode:
`;
  
    return profile;
  };

  copyProfile() {
    const { profile } = this.state;
    clipboardy.writeSync(profile);
    this.setState({ copied: true })
  }

  async requestProfile() {
    this.setState({ copied: false, profile: '' });
    const profile = await this.buildProfile();
    this.setState({ profile });
  }

  render() {
    const { copied, includeFilePaths, profile } = this.state;
    const filePathWarning = (<div className={styles.danger}>
      Note: This will include the locations of various game dependencies on your computer in the system profile. These paths may contain sensitive information such as your real name and aren't always needed when troubleshooting.
    </div>);
    const copyProfile = (<button onClick={this.copyProfile}>Copy Profile</button>);
    return (
      <Container>
        <Header title="Advanced" />
        <Scrollable>
          <Main>
            <textarea className={styles.profile} value={profile} readOnly />
            <div className={styles.profileButtons}>
              <div>
                <button onClick={this.requestProfile}>Request Profile</button>
                <input type="checkbox" name="includeFilePaths" value="IncludeFilePaths" onChange={this.toggleFilePaths} checked={includeFilePaths} />
                Include File Paths?
              </div>
              <div>
                {copied ? 'Copied!' : ''}
                {profile ? copyProfile : ''}
              </div>
            </div>
            {includeFilePaths ? filePathWarning : ''}
            <div>
              yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote yeet yaught yote 
            </div>
          </Main>
        
          <InfoPanel>
            <div className="emphasis">Troubleshooting Tools</div>
            <ul className="list">
              <li className="link">
                <a onClick={launchScreenshotTool}>
                  Take a Screenshot
                </a>
              </li>
              <li className="link">
                <a href="http://forum.freeso.org/threads/common-errors-crashes.6326/" target="_blank" rel="noopener noreferrer">
                    Common Errors &amp; Crashes
                </a>
              </li>
            </ul>
            <div className="emphasis">Launcher Problems?</div>
            <ul className="list">
              <li className="link">
                <a onClick={this.openDevTools}>
                  Open Dev Tools
                </a>
              </li>
            </ul>
          </InfoPanel>
        </Scrollable>
      </Container>
    );
  } 
}

export default Advanced;