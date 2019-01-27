import React, { PureComponent } from 'react';
import Toggle from 'react-toggle';

import Container from '../Container';
import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Main from '../Main';
import Scrollable from '../Scrollable';

import styles from './index.module.css';

import 'react-toggle/style.css';
import './toggle.css';

const settings = {
  'Graphics Mode': 'You to change which graphics API is used when running a game.\n\nOpenGL is cross platform and although it may not be as performant as DirectX, it can sometimes be more compatible with older hardware.\n\nSoftware Mode isn\'t GPU accelerated so although it will work on very old hardware, its performance is very slow.',
  '3D Mode': 'The Sims & The Sims Online didn\'t have true 3D like later games in the series, but FreeSO & Simitone do!\n\nMake sure to download the Remesh package from the Installers tab regularly as it is updated often.',
  'Dark Mode': 'FreeSO Go tries to automatically enable dark mode based on operating system settings, but it\'s not always possible.\n\nIf you decide to go against your system setting, FreeSO Go will keep your preference until the next time they match up.',
  'Accent Color': 'Get just the right pop of color with one of the predefined colors or input a custom color!',
}

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      settingDetailsText: '',
    };

    this.updateDetails = this.updateDetails.bind(this);
  }

  toggle3d() {

  }

  updateDetails(e) {
    e.persist();
    const { type, target } = e;
    const setting = target.dataset.setting;
    if (type === 'mouseenter' && settings[setting]) {
      const textWithBreaks = settings[setting].replace(/\n/g, '<br />');
      this.setState({ settingDetailsText: textWithBreaks });
    } else if (type === 'mouseleave') {
      this.setState({ settingDetailsText: '' });
    }
    
  }

  render() {
    const { settingDetailsText } = this.state;
    return (
      <Container>
        <Header title="Settings" />
        <Scrollable>
          <Main>
            <h3 className="firstHeading">FreeSO &amp; Simitone Settings</h3>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Graphics Mode">
              Graphics Mode
              <select>
                <option value="OpenGL">OpenGL</option>
                <option value="DirectX">DirectX</option>
                <option value="Software">Software</option>
              </select>
            </div>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="3D Mode">
              3D Mode
              <label className={styles.toggle} htmlFor="3d-mode" onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="3D Mode">
                <Toggle
                  id="3d-mode"
                  className="styledToggle"
                  defaultChecked={true}
                  icons={false}
                  onChange={this.toggle3d}
                  onMouseEnter={this.updateDetails} 
                  onMouseLeave={this.updateDetails} />
                  Off
              </label>
            </div>

            <h3>FreeSO Go Settings</h3>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Dark Mode">
              Dark Mode
              <label className={styles.toggle} htmlFor="dark-mode" onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Dark Mode">
                <Toggle
                  id="dark-mode"
                  className="styledToggle"
                  defaultChecked={true}
                  icons={false}
                  onChange={this.toggleDarkMode}
                  onMouseEnter={this.updateDetails} 
                  onMouseLeave={this.updateDetails} />
                  Off
              </label>
            </div>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Accent Color">
              Accent Color
              <select>
                <option value="#3faced">SO Blue</option>
                <option value="#ACB8E8">rip in periwinkle</option>
                <option value="#9966CC">Architect Amethyst</option>
                <option value="#e6ae25">Aquila Ananas Jaune</option>
                <option value="#b31b1b">Maria Manicura Roja</option>
                <option value="Software">Custom</option>
              </select>
            </div>

            
          </Main>
          <InfoPanel>
            <div className="emphasis">{settingDetailsText ? 'Additional Details' : ''}</div>
             <div ref={this.settingDetails} dangerouslySetInnerHTML={{ __html: settingDetailsText }}>
            </div>
          </InfoPanel>
        </Scrollable>
      </Container>
    );
  }
};

export default Settings;