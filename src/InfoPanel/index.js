import React from 'react';

import styles from './index.module.css';

const InfoPanel = (props) => (
  <div className={styles.default}>
    {props.children}
  </div>
);

export default InfoPanel;