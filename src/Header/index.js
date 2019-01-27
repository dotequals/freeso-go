import React from 'react';

import styles from './index.module.css';

const Header = (props) => (
  <header>
    <h1 className={styles.title}>{props.title}</h1>
  </header>
);

export default Header;