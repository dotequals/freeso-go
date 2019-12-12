import React, { Fragment } from 'react';

import InfoPanel from '../InfoPanel';
import Main from '../Main';

import { openObjectsFolder, openUserFolder } from '../utils/openFolder';

import styles from './index.module.css';

const FreeSOPanel = (props) => {
  const { dir, useVolcanic } = props;
  return (
    <Fragment>
      <Main>
        <h3>What is FreeSO?</h3>
        <div>
          FreeSO (Free Simulator Online) is an open-source re-implementation of The Sims Online using C#, .NET, and MonoGame.
        </div>
      </Main>
      <InfoPanel>
        <div className="emphasis">
          Announcements &amp; Updates
        </div>
        <ul className="list">
          <li className="link">
            <a href="https://freeso.org" target="_blank" rel="noopener noreferrer">
              FreeSO.org
            </a>
          </li>
          <li className="link">
            <a href="https://discord.gg/xveESFj" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </li>
        </ul>
        <div className="emphasis">
          Support
        </div>
        <ul className="list">
          <li className="link">
            <a href="https://beta.freeso.org" target="_blank" rel="noopener noreferrer">
              Create an Account
            </a>
          </li>
          <li className="link">
            <a href="https://beta.freeso.org/forgot" target="_blank" rel="noopener noreferrer">
              Forgot Password?
            </a>
          </li>
          <li className="link">
            <a href="http://freeso.org/rules-terms-of-service/" target="_blank" rel="noopener noreferrer">
              Rules &amp; Terms of Service
            </a>
          </li>
          <li className="link">
            <a href="http://forum.freeso.org/threads/common-errors-crashes.6326/" target="_blank" rel="noopener noreferrer">
              Common Errors &amp; Crashes
            </a>
          </li>
        </ul>
        <div className="emphasis">
          Game Resources
        </div>
        <ul className="list">
          <li className="link">
            <a href="https://www.tsomania.net/" target="_blank" rel="noopener noreferrer">
              TSOMania
            </a>
          </li>
          <li className="link">
            <a href="https://dashboard.thecode.house" target="_blank" rel="noopener noreferrer">
              FreeSO Dashboard
            </a>
          </li>
        </ul>
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
      </InfoPanel>
    </Fragment>
  );
}

export default FreeSOPanel;