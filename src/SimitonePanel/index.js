import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import InfoPanel from '../InfoPanel';
import Main from '../Main';

import { openObjectsFolder, openUserFolder } from '../utils/openFolder';

const SimitonePanel = (props) => {
  const { accent, darkTheme, dir, online, useVolcanic } = props;
  return (
    <Fragment>
      <Main>
        <h3>What is Simitone?</h3>
        <div>
          Simitone is an open-source re-implementation of The Sims using C#, .NET, MonoGame, and FreeSO's engine. Currently, a valid copy of The Sims Complete Collection is required or a backup of your The Sims folder. The game also needs to have been opened once using the original Sims.exe to upgrade the neighborhood.
        </div>
      </Main>
      <InfoPanel>
      { useVolcanic ? (
          <Fragment>
            <div className="emphasis">
              Volcanic Helpers
            </div>
            <ul className="list">
              <li className="link">
                <button className="buttonLink" onClick={() => openObjectsFolder(dir)}>
                  Open Objects Folder
                </button>
              </li>
              <li className="link">
                <button className="buttonLink" onClick={() => openUserFolder(dir)}>
                  Open Patch/User Folder
                </button>
              </li>
            </ul>
          </Fragment>
        ): '' }
        { online ? (
          <Fragment>
            <div className="emphasis">Twitter @Simitone</div>
            <TwitterTimelineEmbed
              borderColor={accent}
              linkColor={accent}
              highlightColor={accent}
              noBorders
              noFooter
              noHeader
              noScrollbar
              options={{
                tweetLimit: '5',
              }}
              sourceType="profile"
              screenName="Simitone"
              theme={darkTheme ? 'dark' : 'light'}
              transparent
            />
          </Fragment>
          ) : ''}
      </InfoPanel>
    </Fragment>
  );
};

const mapStateToProps = state => (
  {
    accent: state.settings.accent,
    darkTheme: state.settings.darkTheme,
    online: state.system.online,
  }
)

export default connect(mapStateToProps)(SimitonePanel);