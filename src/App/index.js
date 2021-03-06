import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Mousetrap from 'mousetrap';

import About from '../About';
import Advanced from '../Advanced';
import Home from '../Home';
import Installers from '../Installers';
import Permissions from '../Permissions';
import Settings from '../Settings';
import Sidebar from '../Sidebar';
import TitleBar from '../TitleBar';

import styles from './index.module.css';
import { requestForumData } from '../redux/forum';
import { requestBlogData } from '../redux/blog';
import { toggleDarkMode, toggleUserSet } from '../redux/settings';
import { setFsoDir, setStDir, setTs1Dir, setTsoDir, setGoDir } from '../redux/installed';
import { darkModeListener, isSystemDarkMode } from '../utils/darkModeHelpers';
import { toggleOnlineStatus } from '../redux/system';
import { fsoInstallPath } from '../utils/fsoHelpers';
import { tsoInstallDir } from '../utils/tsoHelpers';
import { ts1InstallPath } from '../utils/ts1Helpers';
import { simitonePath } from '../utils/simitoneHelpers';
import rootDirectory from '../utils/rootDirectory';
import { hasPermissions } from '../utils/permissionsHelpers';

const { platform } = window.nodeRequire('os');
const { remote } = window.nodeRequire('electron');

class App extends Component {
  constructor(props) {
    super(props);
    const { accent, darkTheme, dispatch, userSet } = props; 
    const goDir = rootDirectory();
    this.setAccent(accent);

    if (!userSet) {
      isSystemDarkMode().then((isDark) => {
        isDark ? this.setDarkMode() : this.setLightMode();
        dispatch(toggleDarkMode(isDark));
      });
    } else {
      darkTheme ? this.setDarkMode() : this.setLightMode();
      isSystemDarkMode().then((isDark) => {
        dispatch(toggleUserSet(!(darkTheme === isDark)));
      });
    }

    darkModeListener(dispatch, toggleDarkMode);
    if (window) {
      dispatch(toggleOnlineStatus(window.navigator.onLine));
    }

    tsoInstallDir().then(pathObj => {
      dispatch(setTsoDir(pathObj.value));
      hasPermissions({
        dispatch,
        key: 'tsoPerms',
        path: pathObj.value || goDir,
        permissions: 'ReadAndExecute',
      });
    });

    fsoInstallPath().then(pathObj => {
      dispatch(setFsoDir(pathObj.value));
      hasPermissions({
        dispatch,
        key: 'fsoPerms',
        path: pathObj.value || goDir,
        permissions: 'Modify',
      });
    });

    ts1InstallPath().then(pathObj => {
      dispatch(setTs1Dir(pathObj.value));
      hasPermissions({
        dispatch,
        key: 'ts1Perms',
        path: pathObj.value || goDir,
        permissions: 'ReadAndExecute',
      });
    });

    dispatch(setStDir(simitonePath()));

    dispatch(setGoDir(goDir));
    hasPermissions({
      dispatch,
      key: 'goPerms',
      path: goDir,
      permissions: 'Modify',
    });

    window.addEventListener('online', () => dispatch(toggleOnlineStatus(true)));
    window.addEventListener('offline', () => dispatch(toggleOnlineStatus(false)));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { app } = remote;
    const mainWindow = remote.getCurrentWindow();

    if (platform() === 'darwin') {
      Mousetrap.bind('command+alt+i', () => mainWindow.openDevTools({ mode: 'undocked' }));
      Mousetrap.bind('command+h', () => app.show());
    } else {
      Mousetrap.bind('ctrl+shift+i', () => mainWindow.openDevTools({ mode: 'undocked' }));
      // The window transparency dies on macOS when you reload this way
      Mousetrap.bind(['command+r', 'ctrl+r'], () => mainWindow.reload());
    }

    dispatch(requestForumData());
    dispatch(requestBlogData());

    // Users can manually refresh, but let's update daily for now
    setInterval(() => {
      dispatch(requestForumData());
      dispatch(requestBlogData());
    }, 8.64e7);
  }

  componentDidUpdate(prevProps) {
    const { accent, darkTheme } = this.props;

    if (accent !== prevProps.accent) {
      this.setAccent(accent);
    }

    if (darkTheme !== prevProps.darkTheme) {
      darkTheme ? this.setDarkMode() : this.setLightMode();
    }
  }

  setAccent(accent) {
    const root = document.documentElement;
    root.style.setProperty(
      '--accent',
      accent
    );
  }

  setDarkMode() {
    const style = getComputedStyle(document.body);
    const root = document.documentElement;

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

  setLightMode() {
    const style = getComputedStyle(document.body);
    const root = document.documentElement;

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
  }

  render() {
    const { _3d, accent, darkTheme, fsoDir, fsoPerms, goPerms, stDir, stPerms, ts1Dir, ts1Perms, tsoDir, tsoPerms, graphics } = this.props;
    if (platform() === 'darwin') {
      remote.getCurrentWindow().setVibrancy(darkTheme ? 'dark' : 'medium-light');
    }
    return (
      <div className={`${styles.default} ${darkTheme ? 'dark' : 'light'}`}>
        <TitleBar />
        <div className={styles.content}>
          <Sidebar _3d={_3d} accent={accent} graphics={graphics} />
          <div className={styles.main}>
            <Permissions fsoDir={fsoDir} fsoPerms={fsoPerms} goPerms={goPerms} stDir={stDir} stPerms={stPerms} ts1Dir={ts1Dir} ts1Perms={ts1Perms} tsoDir={tsoDir} tsoPerms={tsoPerms} />
            <Switch>
              <Route exact path="/installers" component={Installers} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/advanced" component={Advanced} />
              <Route exact path="/about" component={About} />
              <Route component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    _3d: state.settings._3d,
    accent: state.settings.accent,
    darkTheme: state.settings.darkTheme,
    goDir: state.installed.goDir,
    goPerms: state.installed.goPerms,
    fsoDir: state.installed.fsoDir,
    fsoPerms: state.installed.fsoPerms,
    graphics: state.settings.graphics,
    stDir: state.installed.stDir,
    stPerms: state.installed.stPerms,
    ts1Dir: state.installed.ts1Dir,
    ts1Perms: state.installed.ts1Perms,
    tsoDir: state.installed.tsoDir,
    tsoPerms: state.installed.tsoPerms,
    userSet: state.settings.userSet,
  }
);

export default withRouter(connect(mapStateToProps)(App));
