import React from 'react';
import TitleBarButtonGroup from './TitleBarButtonGroup';

import styles from './index.module.css';

const { remote } = window.nodeRequire('electron');

const TitleBar = (props) => {
  const {platform} = remote.process;
  // console.log(remote);
  return (
    <div className={platform === 'darwin' ? styles.start : styles.end}>
      <TitleBarButtonGroup remote={remote} />
    </div>
  );
};

export default TitleBar;