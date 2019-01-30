import React from 'react';
import TitleBarButtonGroup from './TitleBarButtonGroup';

import styles from './index.module.css';

const { remote } = window.nodeRequire('electron');
const { process } = remote;

const TitleBar = () => {
  const platform = process.platform;
  const renderButtonGroup = platform !== 'darwin' ? <TitleBarButtonGroup remote={remote} /> : '';
  return (
    <div className={styles.end}>
      {renderButtonGroup}
    </div>
  );
};

export default TitleBar;