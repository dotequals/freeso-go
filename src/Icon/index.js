import React from 'react';
import {ReactComponent as About} from '../assets/images/about.svg';
import {ReactComponent as Advanced} from '../assets/images/advanced.svg';
import {ReactComponent as DotNet} from '../assets/images/dotnet.svg';
import {ReactComponent as FreeSO} from '../assets/images/freeso-icon.svg';
import {ReactComponent as Community} from '../assets/images/home.svg';
import {ReactComponent as Installers} from '../assets/images/installers.svg';
import {ReactComponent as Placeholder} from '../assets/images/placeholder.svg';
import {ReactComponent as Settings} from '../assets/images/settings.svg';
import {ReactComponent as Simitone} from '../assets/images/simitone.svg';
import {ReactComponent as TheSimsOnline} from '../assets/images/the-sims-online.svg';
import {ReactComponent as FsoOutline} from '../assets/images/freeso-icon-big.svg';
import {ReactComponent as OpenAl} from '../assets/images/openal.svg';
import {ReactComponent as RemeshPackage} from '../assets/images/fsom.svg';
import {ReactComponent as Mono} from '../assets/images/monogame.svg';

import styles from './index.module.css';

const mapRoutesToIcons = {
  FreeSO,
  Simitone,
  Community,
  Installers,
  Settings,
  Advanced,
  About,
  Placeholder,
  DotNet,
  TheSimsOnline,
  FsoOutline,
  OpenAl,
  RemeshPackage,
  Mono,
};

const Icon = (props) => {
  const Component = mapRoutesToIcons[props.name || 'Community'];
  return (
    <Component className={styles[props.className] || styles.default} />
  );
};

export default Icon;