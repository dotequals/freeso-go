import React from 'react';

import styles from './index.module.css';

const Container = (props) => {
  console.log(styles.default);
  return (
  <div styles={styles.default}>
    {props.children}
  </div>
  );
};

export default Container;