import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.module.css';

const SidebarItem = (props) => (
  <div className={props.active ? styles.active : styles.default} onClick={props.onClick} target={props.name}>
    {props.name}
  </div>
);

export default SidebarItem;