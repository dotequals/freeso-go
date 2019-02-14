import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SidebarItem from './SidebarItem';

import { launchFso } from '../utils/fsoHelpers';
import { launchSimitone } from '../utils/simitoneHelpers';

import styles from './index.module.css';

import { ReactComponent as Logo } from '../assets/images/freeso.svg';

const { platform } = window.nodeRequire('os');

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);

    this.changeRoute = this.changeRoute.bind(this);
    this.launchGame = this.launchGame.bind(this);
  }

  changeRoute(e) {
    let { textContent } = e.target;
    textContent = textContent.toLowerCase();
    let route = `/${textContent}`;

    if (textContent === 'home') {
      route = '/';
    }

    this.props.history.push(route);
  }

  launchGame(e) {
    e.preventDefault();

    const { button, target } = e;
    const isFso = /freeso/i.test(e.target.textContent);
    const { _3d, graphics } = this.props;
    const divNode = target.nodeName === 'SPAN' || target.nodeName === 'SVG' ? target.parentElement : target;

    divNode.classList.add(styles.launching);
    setTimeout(() => {
      divNode.classList.remove(styles.launching);
    }, 1.5e3);

    if (isFso) {
      // Should alert for volcanic like current launcher
      launchFso(button === 0 ? false : true, _3d, graphics === 'DirectX');
    } else {
      launchSimitone(button === 0 ? false : true, _3d, graphics === 'DirectX');
    }
  }

  render() {
    const { accent, fsoDir, stDir, ts1Dir, tsoDir } = this.props;
    const items = ['Home', 'Installers', 'Settings', 'Advanced', 'About'];
    const games = [];

    if (fsoDir && tsoDir) {
      games.push('Play FreeSO');
    }

    if (stDir && ts1Dir) {
      games.push('Play Simitone');
    }

    let active = this.props.location.pathname;
    active = (/index.html/.test(active) || active === '/') ? '/home' : active.toLowerCase();
    const renderGames = games.map((game) => <SidebarItem key={game} name={game} onClick={this.launchGame} isGame={true} onContextMenu={this.launchGame} />);
    const renderItems = items.map((item) => <SidebarItem key={item} name={item} active={`/${item.toLowerCase()}` === active ? true : false} onClick={this.changeRoute} isGame={false} />);
    return (
      <nav className={platform() === 'darwin' ? styles.default : styles.withColor}>
        <Logo className={accent === '#3faced' ? 'logo' : 'logo accent'} />
        {renderGames}
        {renderItems}
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    fsoDir: state.installed.fsoDir,
    stDir: state.installed.stDir,
    ts1Dir: state.installed.ts1Dir,
    tsoDir: state.installed.tsoDir,
  }
);

export default withRouter(connect(mapStateToProps)(Sidebar));