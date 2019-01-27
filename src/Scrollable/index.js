import React from 'react';

import styles from './index.module.css';

const Scrollable = (props) => (
  <div className={styles.default}>
    {props.children}
  </div>
);

export default Scrollable;