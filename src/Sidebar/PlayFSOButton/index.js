import React, { Component } from 'react';

import styles from './index.module.css';

const { remote } = window.nodeRequire('electron');
const { app } = remote;
const { exec } = window.nodeRequire('child_process');
const path = window.nodeRequire('path');

class PlayFSOButton extends Component {
  constructor(props) {
    super(props);

    this.launchFSO = this.launchFSO.bind(this);
  }

  launchFSO() {
    exec('FreeSO.exe', {
      cwd: `${app.getAppPath()}${path.sep}data${path.sep}FreeSO`,
    }, (err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <button className={styles.default} onClick={this.launchFSO}>Play</button>
    );
  }
}

export default PlayFSOButton;