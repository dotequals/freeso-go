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
      items: ['Home', 'Installers', 'Downloads', 'Settings', 'Advanced', 'About'],
      games: [],
    }

    // Can't seem to add this one to the individual elements
    window.addEventListener('contextmenu', this.launchGame);

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
    if (isFso) {
      // TODO connect redux store of settings
      // Should alert for volcanic like current launcher
      launchFso(button === 0 ? false : true, true, false);
    } else {
      launchSimitone(button === 0 ? false : true, true, true);
    }
  }

  render() {
    const { items, games } = this.state;
    let active = this.props.location.pathname;
    active = active === '/' ? '/home' : active.toLowerCase();
    const renderGames = games.map((game) => <SidebarItem key={game} name={game} onClick={this.launchGame} isGame={true} />);
    const renderItems = items.map((item) => <SidebarItem key={item} name={item} active={`/${item.toLowerCase()}` === active ? true : false} onClick={this.changeRoute} isGame={false} />);
    return (
      <nav className={styles.default}>
        <Logo className={styles.logo} />
        {renderGames}
        {renderItems}
      </nav>
    );
  }
}

export default withRouter(Sidebar);