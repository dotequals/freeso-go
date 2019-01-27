import React, { PureComponent } from 'react';

import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Container from '../Container';
import Main from '../Main';
import Scrollable from '../Scrollable';

import isRunningAsAdmin from '../utils/isRunningAsAdmin';
import launchScreenshotTool from '../utils/launchScreenshotTool';
import { ts1InstallPath } from '../utils/ts1Helpers';
import { tsoInstallDir } from '../utils/tsoHelpers';
import { fsoInstallPath } from '../utils/fsoHelpers';
import { simitonePath } from '../utils/simitoneHelpers';

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

    this.copied = React.createRef();
    this.textarea = React.createRef();

    this.toggleFilePaths = this.toggleFilePaths.bind(this);
    this.buildProfile = this.buildProfile.bind(this);
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

    const ts1Dir = await ts1InstallPath();
    const tsoDir = await tsoInstallDir();
    const simitoneDir = simitonePath();
    const fsoDir = await fsoInstallPath();

    const ram = bytesToGB(mem.total);
    let gpus = '';
    graphics.controllers.forEach((gpu, index) => {
      gpus += `GPU #${index + 1}: ${gpu.model} VRAM: ${kbToGB(gpu.vram)}GB\n`;
    });
    const isAdmin = await isRunningAsAdmin();

    const { includeFilePaths } = this.state;
    let ts1Text = '';
    let tsoText = '';
    let simitoneText = '';
    let fsoText = '';
    if (includeFilePaths) {
      ts1Text = 
`The Sims: ${ts1Dir.value ? ts1Dir.value : 'Not Installed'}
Registry Value? ${ts1Dir.isGlobal ? 'Yes' : `${ts1Dir.value ? 'No' : 'N/A'}`}`;
      tsoText = 
`The Sims Online: ${tsoDir.value ? tsoDir.value : 'Not Installed'}
Registry Value? ${tsoDir.isGlobal ? 'Yes' : `${tsoDir.value ? 'No' : 'N/A'}`}`;
      fsoText =
`FreeSO: ${fsoDir.value ? fsoDir.value : `${tsoDir.value ? 'Not Installed' : 'Not Eligible (Missing The Sims Online)'}`}
Registry Value? ${fsoDir.isGlobal ? 'Yes' : `${fsoDir.value ? 'No' : 'N/A'}`}`;
      simitoneText = 
`Simitone: ${simitoneDir ? simitoneDir : `${ts1Dir.value ? 'Not Installed' : 'Not Eligible (Missing The Sims)'}`}`;
    }

    const profile = 
`${isAdmin ? 'Running' : 'Not running'} FreeSO Go as Administrator

CPU: ${cpu.speed}GHz ${cpu.cores} core ${cpu.manufacturer} ${cpu.brand}
RAM: ${ram}GB
OS: ${os.distro} ${os.release} (${os.arch === 'x64' ? '64 bit' : '32 bit'})
${gpus}
${tsoText}

${fsoText}

${ts1Text}

${simitoneText}

Graphics Mode:
3D Mode:
`;
  
    return profile;
  };

  copyProfile() {
    const { profile } = this.state;
    const copied = this.copied.current;
    clipboardy.writeSync(profile);
    this.setState({ copied: true });
    copied.style.visibility = 'visible';

    setTimeout(() => {
      copied.style.visibility = 'hidden';
    }, 5e3);
  }

  async requestProfile() {
    const copied = this.copied.current;
    const textarea = this.textarea.current;
    copied.style.visibility = 'hidden';
    textarea.style.display = 'none';
    this.setState({ copied: false, profile: '' });

    const profile = await this.buildProfile();
    
    this.setState({ profile });
    textarea.style.display = 'inline-block';
    textarea.style.height = `${this.textarea.current.scrollHeight}px`;
  }

  render() {
    const { includeFilePaths, profile } = this.state;
    const filePathWarning = (<div className={styles.note}>
      Note: This will include the locations of various game dependencies on your computer in the system profile. These paths may contain sensitive information such as your real name and aren't always needed when troubleshooting.
    </div>);
    const copyProfile = (<button onClick={this.copyProfile}>Copy Profile</button>);
    return (
      <Container>
        <Header title="Advanced" />
        <Scrollable>
          <Main>
            <textarea ref={this.textarea} className={styles.profile} value={profile} readOnly />
            <div className={styles.profileButtons}>
              <div className={styles.filePathsGroup}>
                <button onClick={this.requestProfile}>Request Profile</button>
                <div className={styles.filePathsGroupText}>
                  <input className="nonToggle" type="checkbox" name="includeFilePaths" id="includeFilePaths" onChange={this.toggleFilePaths} checked={includeFilePaths} />
                  <label htmlFor="includeFilePaths"> Include File Paths?</label>
                </div>
                
              </div>
              <div className={styles.copyGroup}>
                {profile ? copyProfile : ''}
                <div ref={this.copied} className={styles.copied}>Copied!</div>
              </div>
            </div>
            {includeFilePaths ? filePathWarning : ''}
          </Main>
        
          <InfoPanel>
            <div className="emphasis">Troubleshooting Tools</div>
            <ul className="list">
              <li className="link">
                <button className="buttonLink" onClick={launchScreenshotTool}>
                  Take a Screenshot
                </button>
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
                <button className="buttonLink" onClick={this.openDevTools}>
                  Open Dev Tools
                </button>
              </li>
            </ul>
          </InfoPanel>
        </Scrollable>
      </Container>
    );
  } 
}

export default Advanced;