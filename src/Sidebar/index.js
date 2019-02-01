import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import SidebarItem from './SidebarItem';

import { hasTs1 } from '../utils/ts1Helpers';
import { hasSimitone } from '../utils/simitoneHelpers';
import { hasTso } from '../utils/tsoHelpers';
import { hasFso } from '../utils/fsoHelpers';
import { launchFso } from '../utils/fsoHelpers';
import { launchSimitone } from '../utils/simitoneHelpers';

import styles from './index.module.css';

import { ReactComponent as Logo } from '../assets/images/freeso.svg';

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: ['Home', 'Installers', 'Settings', 'Advanced', 'About'],
      games: [],
    }

    hasTs1().then((installed) => {
      if (installed) {
        const simitone = hasSimitone();
        if (simitone) {
          this.setState({ games: ['Play Simitone'].concat(this.state.games) });
        }
      }
    }).then(() => {
      hasTso().then((installed) => {
        if (installed) {
          hasFso().then((fso) => {
            this.setState({ games: ['Play FreeSO'].concat(this.state.games) });
          });
        }
      });
    });

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
    const { button } = e;
    const isFso = /freeso/i.test(e.target.textContent);
    const { _3d, graphics } = this.props;
    if (isFso) {
      // Should alert for volcanic like current launcher
      launchFso(button === 0 ? false : true, _3d, graphics === 'DirectX');
    } else {
      launchSimitone(button === 0 ? false : true, _3d, graphics === 'DirectX');
    }
  }

  render() {
    const { accent } = this.props;
    const { items, games } = this.state;
    let active = this.props.location.pathname;
    active = active === '/' ? '/home' : active.toLowerCase();
    const renderGames = games.map((game) => <SidebarItem key={game} name={game} onClick={this.launchGame} isGame={true} onContextMenu={this.launchGame} />);
    const renderItems = items.map((item) => <SidebarItem key={item} name={item} active={`/${item.toLowerCase()}` === active ? true : false} onClick={this.changeRoute} isGame={false} />);
    return (
      <nav className={styles.default}>
        <Logo className={accent === '#3faced' ? 'logo' : 'logo accent'} />
        {renderGames}
        {renderItems}
      </nav>
    );
  }
}

export default withRouter(Sidebar);