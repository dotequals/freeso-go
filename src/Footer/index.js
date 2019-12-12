import React from 'react';
import styles from './index.module.css';

const Footer = (props) => (
  <footer className={styles.footer}>
    <hr className={styles.divider} />
    {props.children}
  </footer>
);

export default Footer;