import React from 'react';
import isDarkMode from '../../../utils/isDarkMode';
import styles from './index.module.css';

const TitleBarButton = (props) => {
  const { event, platform, type } = props;
  const uiStyle = platform === 'win32' ? 'win' : 'linux';
  // win-close
  console.log(`${platform}-${type}`);
  return (
    <button className={styles[`${uiStyle}-${type}`]} onClick={event} disabled={platform === 'win32' && type === 'maximize'} />
  );
};

export default TitleBarButton;