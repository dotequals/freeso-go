import React from 'react';

import Icon from '../../Icon';

import styles from './index.module.css';

const SidebarItem = (props) => (
  <div className={`${styles.default} ${props.active ? styles.active : ''}`} onClick={props.onClick} onContextMenu={props.onContextMenu} target={props.name}>
    <Icon name={props.name} /><span className={styles.push}>{props.name}</span>
  </div>
);

export default SidebarItem;