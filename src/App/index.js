import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import About from '../About';
import Advanced from '../Advanced';
import Home from '../Home';
import Installers from '../Installers';
import Settings from '../Settings';
import Sidebar from '../Sidebar';
import TitleBar from '../TitleBar';


import styles from './index.module.css';

class App extends Component {
  componentDidMount() {
    // macOS
    // electron.systemPreferences.isDarkMode ? true || false
    // Windows
    // HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize\AppsUseLightTheme
    // 0 is dark mode, 1 is light mode
  }

  toggleColors() {
    const style = getComputedStyle(document.body);
    const root = document.documentElement;
    if (style.getPropertyValue('--background') === style.getPropertyValue('--background-dark')) {
      // Switch to light
      root.style.setProperty(
        '--background',
        style.getPropertyValue('--background-light')
      );
      root.style.setProperty(
        '--background-translucent',
        style.getPropertyValue('--background-translucent-light')
      );
      root.style.setProperty(
        '--foreground-translucent',
        style.getPropertyValue('--foreground-translucent-light')
      );
      root.style.setProperty(
        '--foreground',
        style.getPropertyValue('--foreground-light')
      );
      root.style.setProperty(
        '--border',
        style.getPropertyValue('--border-light')
      );
      root.style.setProperty(
        '--highlight',
        style.getPropertyValue('--highlight-light')
      );
    } else {
      // Switch to dark
      root.style.setProperty(
        '--background',
        style.getPropertyValue('--background-dark')
      );
      root.style.setProperty(
        '--background-translucent',
        style.getPropertyValue('--background-translucent-dark')
      );
      root.style.setProperty(
        '--foreground-translucent',
        style.getPropertyValue('--foreground-translucent-dark')
      );
      root.style.setProperty(
        '--foreground',
        style.getPropertyValue('--foreground-dark')
      );
      root.style.setProperty(
        '--border',
        style.getPropertyValue('--border-dark')
      );
      root.style.setProperty(
        '--highlight',
        style.getPropertyValue('--highlight-dark')
      );
    }
  }

  render() {
    return (
      <div className={styles.default}>
        <TitleBar />
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.main}>
            <Route exact path="/" component={Home} />
            <Route exact path="/installers" component={Installers} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/advanced" component={Advanced} />
            <Route exact path="/about" component={About} />
            <p>
              <button onClick={this.toggleColors}>Toggle Theme</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
