import React, { PureComponent } from 'react';

import Icon from '../../Icon';

import styles from '../index.module.css';

const { execSync } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');

class NixInstallers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      monoInstalled: false,
    }
  }

  componentDidMount() {
    const mono = execSync('which mono');

    this.setState({
      monoInstalled: Boolean(mono),
    });
  }

  render() {
    const { monoInstalled } = this.state;
    const _platform = platform();
    const mono = _platform === 'darwin' ? 'Mono (Stable channel)' : 'mono-complete';

    return (
      <div>
        <div className={styles.installGroup}>
          <Icon name="Mono" className="big" />
          <div className={styles.installText}>
            <h3 className="firstHeading">{mono}</h3>
            {
              monoInstalled ? (
                <div className="subHeading">
                  Installed! You have mono installed.
                </div>
              ) : (
                <div className="subText">
                  Please install {mono} manually following&nbsp;
                  <a href={`https://www.mono-project.com/download/stable/#download-${_platform === 'darwin' ? 'mac' : 'lin'}`} target="_blank" rel="noopener noreferrer">
                    these instructions
                  </a>
                  .
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default NixInstallers;