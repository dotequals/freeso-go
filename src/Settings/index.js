import React, { PureComponent } from 'react';
import Toggle from 'react-toggle';
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';

import Container from '../Container';
import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Main from '../Main';
import Scrollable from '../Scrollable';

import { toggle3d, toggleDarkMode, toggleUserSet, changeGraphicsMode, changeAccentColor } from '../redux/settings';
import { fsoInstallPath } from '../utils/fsoHelpers';
import { isSystemDarkMode } from '../utils/darkModeHelpers';
import rootDirectory from '../utils/rootDirectory';

import styles from './index.module.css';

import 'react-toggle/style.css';
import './toggle.css';

const { platform } = window.nodeRequire('os');
const { copy, remove } = window.nodeRequire('fs-extra');
const { join } = window.nodeRequire('path');

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
  { label: 'Maria Manicura Roja', value: '#b31b1b'},
  { label: 'Custom...', value: 'custom'},
];

const findAccentValue = (accent) => {
  for (let i = 0; i < accents.length; i += 1) {
    if (accents[i].value === (accent || '').toLowerCase()) {
      return accents[i];
    }
  }
  return accents[accents.length - 1];
}

const graphicsModes = ['OpenGL', 'DirectX', 'Software'];

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    const { accent } = props;
    this.state = {
      showCustom: findAccentValue(accent).value === 'custom',
      settingDetailsText: '',
    };

    this.updateDetails = this.updateDetails.bind(this);
    this.dispatchDarkTheme = this.dispatchDarkTheme.bind(this);
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
      this.setState({ settingDetailsText: '' });
    } 
  }

  async dispatchDarkTheme(e) {
    const { darkTheme, dispatch } = this.props;
    const systemPref = await isSystemDarkMode();

    dispatch(toggleDarkMode(!darkTheme));
    dispatch(toggleUserSet(systemPref === darkTheme));
  }

  dispatchAccent(e) {
    const { dispatch } = this.props;
    const { value } = e;

    if (value === 'custom') {
      dispatch(changeAccentColor('#367abb'));
      this.setState({ showCustom: true });
    } else if (value) {
      dispatch(changeAccentColor(value));
      this.setState({ showCustom: false });
    } else {
      dispatch(changeAccentColor(e.hex));
    }
  }

  async dispatchGraphics(e) {
    const { dispatch, graphics } = this.props;
    const { value } = e;

    // Don't need to check platform here because combo box is disabled
    if (graphics !== 'Software' && value === 'Software') {
      const fsoDir = await fsoInstallPath();
      await copy(join(rootDirectory(), 'bin', 'dxtn.dll'), join(fsoDir.value, 'dxtn.dll'), (err) => {
        if (err) {
          console.log(err);
        }
      });
      await copy(join(rootDirectory(), 'bin', 'opengl32.dll'), join(fsoDir.value, 'opengl32.dll'), (err) => {
        if (err) {
          console.log(err);
        }
      });
      dispatch(changeGraphicsMode(value));
      dispatch(toggle3d(false));
    } else if (graphics === 'Software' && value !== 'Software') {
      const fsoDir = await fsoInstallPath();
      await remove(join(fsoDir.value, 'dxtn.dll'), (err) => {
        if (err) {
          console.log(err);
        }
      });
      await remove(join(fsoDir.value, 'opengl32.dll'), (err) => {
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
    // DirectX requires Windows
    // Software rendering not on Windows requires a version of MESA that forces software rendering (out of scope for this project)
    const unixNote = _platform !== 'win32' ? <div className="note">Note: OpenGL is the only graphics mode for this platform.</div> : '';
    const softwareNote = 'Note: 3D Mode is disabled when using Software Mode';
    return (
      <Container>
        <Header title="Settings" />
        <Scrollable>
          <Main>
            <h3 className="firstHeading">FreeSO &amp; Simitone Settings</h3>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Graphics Mode">
              Graphics Mode
              <Dropdown options={graphicsModes} value={graphics} onChange={this.dispatchGraphics} disabled={_platform !== 'win32'} />
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
                  onChange={this.dispatchDarkTheme}
                  onMouseEnter={this.updateDetails} 
                  onMouseLeave={this.updateDetails} />
                  {darkTheme ? 'On' : 'Off'}
              </label>
            </div>
            <div className={styles.setting} onMouseEnter={this.updateDetails} onMouseLeave={this.updateDetails} data-setting="Accent Color">
              Accent Color
              <Dropdown options={accents} value={findAccentValue(accent || '')} onChange={this.dispatchAccent} />
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