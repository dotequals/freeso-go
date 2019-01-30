import React from 'react';

import Loading from '../Loading';

import styles from './index.module.css';

const Header = (props) => {
  const { loading, title } = props;
  return (
    <header className={styles.default}>
      <h1 className={styles.title}>{title}</h1>
      <Loading loading={loading} />
    </header>
  );
};

export default Header;