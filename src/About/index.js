import React from 'react';

import Header from '../Header';

import Container from '../Container';
import Scrollable from '../Scrollable';
import Main from '../Main';
import InfoPanel from '../InfoPanel';

const title = 'About';

const About = () => (
  <Container>
    <Header title={title} />
    <Scrollable>
      <Main>
        <h3 className="firstHeading">What is FreeSO?</h3>
        <div>
          FreeSO (Free Simulator Online) is a re-implementation of The Sims Online&trade; (TSO) using C#, .NET, and MonoGame.
        </div>
        <h3>Is FreeSO Legal?</h3>
        <div>
          Yes, FreeSO consists of 100% original code reverse-engineered to replicate the gameplay of TSO. FreeSO is only a game engine, thus any content that resembles the graphics or sound effects of TSO must be legally obtained and provided by the user. We neither distribute nor alter any intellectual property belonging to Electronic Arts, Inc. We use our own original artwork to promote FreeSO and maintain the project as non-commercial. 
        </div>
        <h3>Will FreeSO always be free-to-play?</h3>
        <div>
          Yes, it will always be free in its entirety.
        </div>
        <h3>How do I launch Volcanic (FSO.IDE)?</h3>
        <div>
          Right-click the play button.
        </div>
      </Main>
      <InfoPanel>
        <div className="emphasis">
          Helpful Links
        </div>
        <ul className="list">
          <li className="link">
            <a href="https://freeso.org" target="_blank" rel="noopener noreferrer">
              FreeSO.org
            </a>
          </li>
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
          Official Channels
        </div>
        <ul className="list">
          <li className="link">
            <a href="https://discord.gg/xveESFj" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </li>
          <li className="link">
            <a href="http://forum.freeso.org/" target="_blank" rel="noopener noreferrer">
              Forum
            </a>
          </li>
          <li className="link">
            <a href="https://twitter.com/freesogame" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li className="link">
            <a href="https://www.facebook.com/freesoproject/" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
          <li className="link">
            <a href="https://www.reddit.com/r/freesogame" target="_blank" rel="noopener noreferrer">
              Reddit
            </a>
          </li>
        </ul>
        <div className="emphasis">
          Third-Party Resources
        </div>
        <ul className="list">
          <li className="link">
            <a href="http://www.tsomania.net/" target="_blank" rel="noopener noreferrer">
              TSOMania
            </a>
          </li>
          <li className="link">
            <a href="https://dashboard.thecode.house" target="_blank" rel="noopener noreferrer">
              FreeSO Dashboard
            </a>
          </li>
        </ul>
      </InfoPanel>
    </Scrollable>
  </Container>
);

export default About;