import React from 'react';
import isDarkMode from '../../../utils/isDarkMode';
import styles from './index.module.css';

const TitleBarButton = (props) => (
  <button className={styles[`${props.type}-${isDarkMode() ? 'dark' : 'light'}`]} onClick={props.event} />
);

export default TitleBarButton;