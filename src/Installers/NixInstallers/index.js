import React, { PureComponent } from 'react';

import Icon from '../../Icon';

import styles from '../index.module.css';

const { exec } = window.nodeRequire('child_process');
const { platform } = window.nodeRequire('os');

class NixInstallers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      monoInstalled: false,
    }

    this.checkMono = this.checkMono.bind(this);
  }

  componentDidMount() {
    this.checkMono();
  }

  checkMono() {
    const { setCoreDependencies, setLoading } = this.props;
    setLoading(true);
    exec('which mono', (error) => {
      this.setState({ monoInstalled: !error });
      setCoreDependencies(!error);
      setLoading(false);
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
            <h3>{mono}</h3>
            {
              monoInstalled ? (
                <div className="subHeading">
                  mono is installed.
                </div>
              ) : (
                <div>
                  <div className="subText">
                    Please install {mono} manually following&nbsp;
                    <a href={`https://www.mono-project.com/download/stable/#download-${_platform === 'darwin' ? 'mac' : 'lin'}`} target="_blank" rel="noopener noreferrer">
                      these instructions
                    </a>
                    .
                  </div>
                  <button style={{ marginTop: '1rem' }} onClick={this.checkMono}>Verify</button>
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