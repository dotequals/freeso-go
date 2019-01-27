import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import SidebarItem from './SidebarItem';
// import PlayFSOButton from './PlayFSOButton';

import { hasTs1 } from '../utils/ts1Helpers';

import styles from './index.module.css';

import { ReactComponent as Logo } from '../assets/images/freeso.svg';

const sidebarItems = ['Home', 'Installers', 'Downloads', 'Settings', 'Advanced', 'About'];
class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    
    if (hasTs1()) {
      sidebarItems.unshift('Play Simitone');
    }

    if (true) {
      sidebarItems.unshift('Play FreeSO');
    }

    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(e) {
    let { textContent } = e.target;
    textContent = textContent.toLowerCase();
    let route = `/${textContent}`;

    if (textContent === 'home') {
      route = '/';
    }

    if (textContent === 'play') {

    }

    this.props.history.push(route);
  }

  render() {
    let active = this.props.location.pathname;
    active = active === '/' ? '/home' : active.toLowerCase();
    const renderSidebar = sidebarItems.map((item, index) => <SidebarItem key={item} name={item} active={`/${item.toLowerCase()}` === active ? true : false} onClick={this.changeRoute} />);
    return (
      <nav className={styles.default}>
        <Logo className={styles.logo} />
        {/* <PlayFSOButton /> */}
        {renderSidebar}
      </nav>
    );
  }
}

export default withRouter(Sidebar);