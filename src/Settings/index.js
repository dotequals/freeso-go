import React, { PureComponent } from 'react';
import Toggle from 'react-toggle';
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';

import Container from '../Container';
import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Main from '../Main';
import Scrollable from '../Scrollable';

import { toggle3d, toggleDarkMode, changeGraphicsMode, changeAccentColor } from '../redux/settings';

import styles from './index.module.css';

import 'react-toggle/style.css';
import './toggle.css';

const { platform } = window.nodeRequire('os');

const settings = {
  'Graphics Mode': 'This allows you to change which graphics API is used when running a game.\n\nOpenGL is cross platform and although it may not be as performant as DirectX, it can sometimes be more compatible with older hardware.\n\nSoftware Mode isn\'t GPU accelerated so although it will work on very old hardware, its performance is very slow.',
  '3D Mode': 'The Sims & The Sims Online didn\'t have true 3D like later games in the series, but FreeSO & Simitone do!\n\nMake sure to download the Remesh package from the Installers tab regularly as it is updated often.',
  'Dark Mode': 'FreeSO Go tries to automatically enable dark mode based on operating system level preferences on platforms where available.\n\nIf you diverge from your OS preference, FreeSO Go will keep your preference until the next time they match up.',
  'Accent Color': 'Get just the right pop of color with one of the predefined colors or input a custom color!',
}

const accentHex = ['#3faced', '#acb8e8', '#9966cc', '#e6ae25', '#b31b1b'];
const accentNames = ['So Blue', 'Rip in Periwinkle', 'Architect Amethyst', 'Aquila Ananas Jaune', 'Maria Manicura Roja'];
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
      this.setState({ settingDetailsText: '' });
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

  dispatchGraphics(e) {
    const { dispatch, graphics } = this.props;
    const { target } = e;
    const { value } = target;

    if (graphics !== 'Software' && value === 'Software') {
      dispatch(changeGraphicsMode(value));
      dispatch(toggle3d(false));
    } else if (graphics === 'Software' && value !== 'Software') {
      // Changing from Software
      dispatch(changeGraphicsMode(value));
    } else {
      dispatch(changeGraphicsMode(value));
    }
  }

  render() {
    const { _3d, accent, darkTheme, dispatch, graphics } = this.props;
    const { settingDetailsText, showCustom } = this.state;
    const renderGraphicsModes = graphicsModes.map(mode => <option key={mode} value={mode} disabled={mode === 'DirectX' && platform() !== 'win32'}>{mode}</option>);
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
              <select value={graphics} onChange={this.dispatchGraphics}>
                {renderGraphicsModes}
              </select>
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
            <div className="emphasis">{settingDetailsText ? 'Additional Details' : ''}</div>
             <div ref={this.settingDetails} dangerouslySetInnerHTML={{ __html: settingDetailsText }}>
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