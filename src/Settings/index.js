import React, { PureComponent } from 'react';
import Toggle from 'react-toggle';
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';
import Select from 'react-select';

import Container from '../Container';
import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Main from '../Main';
import Scrollable from '../Scrollable';

import { toggle3d, toggleDarkMode, changeGraphicsMode, changeAccentColor } from '../redux/settings';
import { fsoInstallPath } from '../utils/fsoHelpers';

import styles from './index.module.css';

import 'react-toggle/style.css';
import './toggle.css';

const { platform } = window.nodeRequire('os');
const fs = window.nodeRequire('fs');
const path = window.nodeRequire('path');
const { remote } = window.nodeRequire('electron');
const { app } = remote

const settings = {
  'Graphics Mode': 'This allows you to change which graphics API is used when running a game.\n\nOpenGL is cross platform and although it may not be as performant as DirectX, it can sometimes be more compatible with older hardware.\n\nSoftware Mode isn\'t GPU accelerated so although it will work on very old hardware, its performance is very slow.',
  '3D Mode': 'The Sims & The Sims Online didn\'t have true 3D like later games in the series, but FreeSO & Simitone do!\n\nMake sure to download the Remesh package from the Installers tab regularly as it is updated often.',
  'Dark Mode': 'FreeSO Go tries to automatically enable dark mode based on operating system level preferences on platforms where available.\n\nIf you diverge from your OS preference, FreeSO Go will keep your preference until the next time they match up.',
  'Accent Color': 'Get just the right pop of color with one of the predefined colors or input a custom color!',
}

// Architect Amethyst #9966cc
const accents = [
  { label: 'So Blue', value: '#3faced'},
  { label: 'Rip in Periwinkle', value: '#7c83bc'},
  { label: 'Architect Antique Bronze', value: '#937e57'},
  { label: 'Aquila Ananas Jaune', value: '#e6ae25'},
  { label: '#b31b1b', value: 'Maria Manicura Roja'},
  { label: 'Custom...', value: 'custom'},
];
const accentHex = ['#3faced', '#7c83bc', '#937E57', '#e6ae25', '#b31b1b'];
const accentNames = ['So Blue', 'Rip in Periwinkle', 'Architect Antique Bronze', 'Aquila Ananas Jaune', 'Maria Manicura Roja'];
const graphicsModes = ['OpenGL', 'DirectX', 'Software'];

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    const { accent } = props;
    this.state = {
      showCustom: !accentHex.includes(accent),
      settingDetailsText: '',
    };

    this.updateDetails = this.updateDetails.bind(this);
    this.dispatchAccent = this.dispatchAccent.bind(this);
    this.dispatchGraphics = this.dispatchGraphics.bind(this);
  }

  updateDetails(e) {
    e.persist();
    const { type, target } = e;
    const setting = target.dataset.setting;
    if (type === 'mouseenter' && settings[setting]) {
      const textWithBreaks = settings[setting].replace(/\n/g, '<br />');
      this.setState({ settingDetailsText: textWithBreaks });
    } else if (type === 'mouseleave') {
      // this.setState({ settingDetailsText: '' });
    } 
  }

  dispatchAccent(e) {
    const { dispatch } = this.props;
    const { target } = e;

    if (target && target.value === 'custom') {
      dispatch(changeAccentColor('#367abb'));
      this.setState({ showCustom: true });
    } else if (target && target.localName === 'select') {
      dispatch(changeAccentColor(e.target.value));
      this.setState({ showCustom: false });
    } else if (e.hex) {
      dispatch(changeAccentColor(e.hex));
    }
  }

  async dispatchGraphics(e) {
    const { dispatch, graphics } = this.props;
    const { target } = e;
    const { value } = target;

    // Don't need to check platform here because combo box is disabled
    if (graphics !== 'Software' && value === 'Software') {
      const fsoDir = await fsoInstallPath();
      await fs.copyFile(`${app.getAppPath()}${path.sep}bin${path.sep}dxtn.dll`, `${fsoDir.value}${path.sep}dxtn.dll`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      await fs.copyFile(`${app.getAppPath()}${path.sep}bin${path.sep}opengl32.dll`, `${fsoDir.value}${path.sep}opengl32.dll`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      dispatch(changeGraphicsMode(value));
      dispatch(toggle3d(false));
    } else if (graphics === 'Software' && value !== 'Software') {
      const fsoDir = await fsoInstallPath();
      await fs.unlink(`${fsoDir.value}${path.sep}dxtn.dll`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      await fs.unlink(`${fsoDir.value}${path.sep}opengl32.dll`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      // Changing from Software
      dispatch(changeGraphicsMode(value));
    } else {
      dispatch(changeGraphicsMode(value));
    }
  }

  render() {
    const { _3d, accent, darkTheme, dispatch, graphics } = this.props;
    const { settingDetailsText, showCustom } = this.state;
    const _platform = platform();
    const renderGraphicsModes = graphicsModes.map(mode => <option key={mode} value={mode}>{mode}</option>);
    // DirectX requires Windows
    // Software rendering not on Windows requires a version of MESA that forces software rendering (out of scope for this project)
    const unixNote = _platform !== 'win32' ? <div className="note">Note: OpenGL is the only graphics mode for this platform.</div> : '';
    const softwareNote = 'Note: 3D Mode is disabled when using Software Mode';
    const renderAccents = accentNames.map((name, index) => <option key={name} value={accentHex[index]}>{name}</option>);
    return (
      <Container>
        <Header title="Settings" />
        <Scrollable>
          <Main>
            <h3 className="firstHeading">FreeSO &amp; Simitone Settings</h3>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Graphics Mode">
              Graphics Mode
              <select value={graphics} onChange={this.dispatchGraphics} disabled={_platform !== 'win32'}>
                {renderGraphicsModes}
              </select>
              {unixNote}
            </div>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="3D Mode">
              3D Mode
              <label className={styles.toggle} htmlFor="3d-mode" onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="3D Mode">
                <Toggle
                  id="3d-mode"
                  className="styledToggle"
                  checked={_3d}
                  disabled={graphics === 'Software'}
                  icons={false}
                  onChange={() => dispatch(toggle3d(!_3d))}
                  onMouseEnter={this.updateDetails} 
                  onMouseLeave={this.updateDetails} />
                  {_3d ? 'On' : 'Off'}
              </label>
              {
                graphics === 'Software' ? <div className="note">{softwareNote}</div> : ''
              }
            </div>

            <h3>FreeSO Go Settings</h3>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Dark Mode">
              Dark Mode
              <label className={styles.toggle} htmlFor="dark-mode" onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Dark Mode">
                <Toggle
                  id="dark-mode"
                  className="styledToggle"
                  checked={darkTheme}
                  icons={false}
                  onChange={() => dispatch(toggleDarkMode(!darkTheme))}
                  onMouseEnter={this.updateDetails} 
                  onMouseLeave={this.updateDetails} />
                  {darkTheme ? 'On' : 'Off'}
              </label>
            </div>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Accent Color">
              Accent Color
              <Select
                onChange={this.dispatchAccent}
                options={
                  accentNames.map((name, index) => ({ value: accentHex[index], label: name}))
                    .concat([{ value: 'custom', label: 'Custom'}])
                }
                value={accentHex.includes(accent) ? accent : 'custom'}
              />
              <select value={accentHex.includes(accent) ? accent : 'custom'} onChange={this.dispatchAccent}>
                {renderAccents}
                <option value="custom">Custom</option>
              </select>
              <div className={styles.pickerParent}>
              {
                 showCustom ? <ChromePicker className="picker" color={accent} disableAlpha={true} onChange={this.dispatchAccent} /> : ''
              } 
              </div>
            </div>

            
          </Main>
          <InfoPanel>
            <div className={styles.center}>
              <div className="emphasis">{settingDetailsText ? 'Additional Details' : ''}</div>
              <div ref={this.settingDetails} dangerouslySetInnerHTML={{ __html: settingDetailsText }} />
            </div>
          </InfoPanel>
        </Scrollable>
      </Container>
    );
  }
};

const mapStateToProps = state => (
  {
    _3d: state.settings._3d,
    accent: state.settings.accent,
    darkTheme: state.settings.darkTheme,
    graphics: state.settings.graphics,
  }
);

export default connect(mapStateToProps)(Settings);