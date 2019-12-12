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
        <h3>Are FreeSO &amp; Simitone Legal?</h3>
        <div>
          Yes, they are a reverse-engineering of SimAntics that can load the game files of The Sims and The Sims Online. Any intellectual property (IP) belonging to Electronic Arts must be legally obtained and provided by the user. We neither distribute nor alter any IP belonging to Electronic Arts, Inc. We use our own original artwork to promote the games and maintain the projects as non-commercial. 
        </div>
        <h3>Will FreeSO &amp; Simitone always be Free-to-Play?</h3>
        <div>
          Yes, they will always be free open-source software, but in the case of Simitone, an install of The Sims Complete Collection or a backup of game data is required.
        </div>
        <h3>What is Volcanic?</h3>
        <div>
          Volcanic is an object development environment for FreeSO and Simitone that aims to replicate Maxis' official editor, Edith. It can read object data from The Sims 1 and The Sims Online and even create custom content or patches of existing content that is compatible with them. For a deep dive about the software you can read <a href="https://freeso.org/stuff/Volcanic.pdf" target="_blank" rel="noopener noreferrer">this paper</a>.
        </div>
      </Main>
      <InfoPanel>
        <div className="emphasis">
          Source Code
        </div>
        <ul className="list">
          <li className="link">
            <a href="https://github.com/riperiperi/FreeSO" target="_blank" rel="noopener noreferrer">
              FreeSO GitHub
            </a>
          </li>
          <li className="link">
            <a href="https://github.com/riperiperi/Simitone" target="_blank" rel="noopener noreferrer">
              Simitone GitHub
            </a>
          </li>
        </ul>
        
        <div className="emphasis">
          Communication
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
      </InfoPanel>
    </Scrollable>
  </Container>
);

export default About;