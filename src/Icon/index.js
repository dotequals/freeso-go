import React from 'react';
import {ReactComponent as About} from '../assets/images/about.svg';
import {ReactComponent as Advanced} from '../assets/images/advanced.svg';
import {ReactComponent as PlayFreeSO} from '../assets/images/freeso-icon.svg';
import {ReactComponent as Home} from '../assets/images/home.svg';
import {ReactComponent as Installers} from '../assets/images/installers.svg';
import {ReactComponent as Settings} from '../assets/images/settings.svg';

import styles from './index.module.css';

const mapRoutesToIcons = {
  'Play FreeSO': PlayFreeSO,
  'Play Simitone': Home,
  Home,
  Installers,
  Settings,
  Advanced,
  About,
};

const Icon = (props) => {
  const Component = mapRoutesToIcons[props.name || 'Home'];
  return (
    <Component className={styles.default} />
  );
};

export default Icon;