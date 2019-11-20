import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tsoInstallDir } from '../../utils/tsoHelpers';

class TSOInstall extends Component {
  constructor(props) {
    super(props);
  }

  async fetchTso() {
    this.setLoading(true);

    const tmpPath = join(rootDirectory(), 'tmp');
    const tsoUrl = 'http://ia801903.us.archive.org/tarview.php?tar=/33/items/Fileplanet_dd_042006/Fileplanet_dd_042006.tar&file=042006/TSO_Installer_v1.1239.1.0.zip';
    await ensureDir(tmpPath);
    progress(request(tsoUrl), { throttle: 1e3 })
    .on('progress', (state) => {
      // console.log('Progress...');
      console.log(state);
    })
    .on('error', (error) => {
      console.log(error);
    })
    .on('end', () => {
      this.installTso();
      // this.setLoading(false);
    })
    .pipe(createWriteStream(join(tmpPath, 'TSO_Installer_v1.1239.1.0.zip')));
  }

  render () {
    return (
      <div className={styles.installText}>
        <h3 className="firstHeading">The Sims Online</h3>
        {
          tsoDir ? (
            <div className={styles.reinstallable}>
              <div className="subHeading">
                The Sims Online is installed. <br />
                {tsoInstallDir}
              </div>
              <div className={styles.reinstall}>
                <button>Reinstall</button>
                {tsoGlobal ? <button>Make Local</button> : ''}
              </div>
            </div>
          ) : (
            <div>
              <button onClick={this.fetchTso}>
                Install The Sims Online
              </button>
              <button onClick={this.setHasTso}>
                Verify
              </button>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    tsoDir: state.installed.tsoDir,
    tsoGlobal: state.installed.tsoGlobal,
  }
);

export default connect(mapStateToProps)(TSOInstall);