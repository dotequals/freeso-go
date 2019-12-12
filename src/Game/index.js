import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';

import Container from '../Container';
import Footer from '../Footer';
import FreeSOPanel from '../FreeSOPanel';
import Header from '../Header';
import Scrollable from '../Scrollable';

import playButtonText from '../utils/playButtonText';
import { readVersion } from '../utils/readVersion';
import { launchFso } from '../utils/fsoHelpers';
import { launchSimitone } from '../utils/simitoneHelpers';

import styles from './index.module.css';
import SimitonePanel from '../SimitonePanel';

class Game extends Component {
  constructor(props) {
    super(props);
    const { game } = props;
    this.state = {
      dropdown: [
        { label: game, value: game },
        { label: `${game} + Volcanic IDE`, value: `${game}-ide`},
      ],
      launch: game,
      version: '',
    };

    this.launchGame = this.launchGame.bind(this);
    this.options = this.options.bind(this);
    this.dropdownChanged = this.dropdownChanged.bind(this);
  }

  async componentDidUpdate(nextProps) {
    const { fsoDir, game, stDir } = this.props;
    const nextGame = nextProps.game;
    let dir = '';

    switch (game) {
      case 'FreeSO':
        dir = fsoDir;
        break;
      case 'Simitone':
        dir = stDir;
        break;
      default:
        break;
    }

    if (game !== nextGame) {
      const version = await readVersion(dir);
      this.setState({ 
        dropdown: [
          { label: game, value: game },
          { label: `${game} + Volcanic IDE`, value: `${game}-ide`},
        ],
        launch: game,
        version
      });
    }
  }

  async launchGame(e) {
    const { _3d, fsoDir, game, graphics, stDir } = this.props;
    const { launch } = this.state;
    const useVolcanic = /ide/.test(launch);
    let dir = '';

    switch(game) {
      case 'FreeSO':
        dir = fsoDir;
        break;
      case 'Simitone':
        dir = stDir;
        break;
      default:
        break;
    }

    if (game === 'FreeSO') {
      launchFso(dir, useVolcanic, _3d, graphics === 'DirectX');
    }
    if (game === 'Simitone') {
      launchSimitone(dir, useVolcanic, _3d, graphics === 'DirectX');
    }
    
    // Not the best solution to make sure the version is up to date
    const version = await readVersion(dir);
    this.setState({ version });
  }

  options() {
    const { game } = this.props;
    this.props.history.push(`/settings?game=${game.toLowerCase()}`);
  }

  dropdownChanged(e) {
    const launch = e.value;
    this.setState({ launch });
  }

  render() {
    const { fsoDir, fsoPerms, game, stDir, stPerms, ts1Dir, ts1Perms, tsoDir, tsoPerms } = this.props;
    const { dropdown, launch, version } = this.state;

    let actionButtonText = '';
    let canPlay = false;
    let dir = '';
    let gameComponent = '';
    let patchNotesHref = '';

    switch(game) {
      case 'FreeSO':
        actionButtonText = playButtonText(fsoDir, fsoPerms, tsoDir, tsoPerms);
        canPlay = (fsoDir && fsoPerms && tsoDir && tsoPerms);
        dir = fsoDir;
        gameComponent = <FreeSOPanel useVolcanic={/ide/.test(launch)} dir={dir} />;
        patchNotesHref = 'https://github.com/riperiperi/FreeSO/releases';
        break;
      case 'Simitone':
        actionButtonText = playButtonText(stDir, stPerms, ts1Dir, ts1Perms);
        canPlay = (stDir && stPerms && ts1Dir && ts1Perms);
        dir = stDir;
        gameComponent = <SimitonePanel useVolcanic={/ide/.test(launch)} dir={dir} />;
        patchNotesHref = 'https://github.com/riperiperi/Simitone/releases';
        break;
      default:
        break;
    }

    if (dir && !version) {
      readVersion(dir).then((version) => {
        this.setState({ version });
      });
    }

    return (
      <Container>
        <Header title={game} />
        <Scrollable>
          {gameComponent}
        </Scrollable>
        <Footer>
          <Dropdown disabled={!canPlay} options={dropdown} value={launch} onChange={this.dropdownChanged} />
          <div className={styles.details}>
            <div>
              <button disabled={!canPlay} onClick={this.launchGame}>{actionButtonText}</button>
              { canPlay ? <button onClick={this.options}>Options</button> : ''}
            </div>
            { version ? <span className={styles.detailText}>Version {version}. View the <a href={patchNotesHref} target="_blank" rel="noopener noreferrer">Patch Notes</a>.</span> : '' }
          </div>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => (
  {
    _3d: state.settings._3d,
    graphics: state.settings.graphics,
    fsoDir: state.installed.fsoDir,
    fsoPerms: state.installed.fsoPerms,
    stDir: state.installed.stDir,
    stPerms: state.installed.stPerms,
    ts1Dir: state.installed.ts1Dir,
    ts1Perms: state.installed.ts1Perms,
    tsoDir: state.installed.tsoDir,
    tsoPerms: state.installed.tsoPerms,
  }
);

export default connect(mapStateToProps)(Game);