import React from 'react';

import styles from './index.module.css';

const SidebarItem = (props) => (
  <div className={props.active ? styles.active : styles.default} onClick={props.onClick} target={props.name}>
    <span className={styles.push}>{props.name}</span>
  </div>
);

export default SidebarItem;