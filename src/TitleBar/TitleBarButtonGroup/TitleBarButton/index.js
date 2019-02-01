import React from 'react';
import styles from './index.module.css';

const TitleBarButton = (props) => {
  const { event, platform, type } = props;
  const uiStyle = platform === 'win32' ? 'win' : 'linux';

  return (
    <button className={styles[`${uiStyle}-${type}`]} onClick={event} disabled={platform === 'win32' && type === 'maximize'} />
  );
};

export default TitleBarButton;