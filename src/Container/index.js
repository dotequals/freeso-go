import React from 'react';

import styles from './index.module.css';

const Container = (props) => (
  <div className={styles.default}>
    {props.children}
  </div>
);

export default Container;