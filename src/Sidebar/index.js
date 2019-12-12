import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import SidebarItem from './SidebarItem';

import styles from './index.module.css';

import { ReactComponent as Logo } from '../assets/images/freeso.svg';

const { platform } = window.nodeRequire('os');

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(e) {
    let { textContent } = e.target;
    textContent = textContent.toLowerCase();
    let route = `/${textContent}`;

    if (textContent === 'community') {
      route = '/';
    }

    this.props.history.push(route);
  }

  render() {
    const { accent } = this.props;
    const items = ['Community', 'Installers', 'Settings', 'Advanced', 'About'];
    const games = ['FreeSO', 'Simitone'];

    let active = this.props.location.pathname;
    active = (/index.html/.test(active) || active === '/') ? '/community' : active.toLowerCase();
    const renderGames = games.map((game) => <SidebarItem key={game} name={game} active={`/${game.toLowerCase()}` === active ? true : false} onClick={this.changeRoute} />);
    const renderItems = items.map((item) => <SidebarItem key={item} name={item} active={`/${item.toLowerCase()}` === active ? true : false} onClick={this.changeRoute} />);
    return (
      <nav className={platform() === 'darwin' ? styles.default : styles.withColor}>
        <Logo className={accent === '#3faced' ? 'logo' : 'logo accent'} />
        {renderGames}
        <hr className={styles.divider} />
        {renderItems}
      </nav>
    );
  }
}

export default withRouter((Sidebar));