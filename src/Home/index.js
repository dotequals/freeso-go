import React from 'react';

import Container from '../Container';
import Header from '../Header';
import InfoPanel from '../InfoPanel';
import Main from '../Main';
import Scrollable from '../Scrollable';

const Home = () => (
  <Container>
    <Header title="Home" />
    <Scrollable>
      <Main>
      </Main>
      <InfoPanel>
      </InfoPanel>
    </Scrollable>
  </Container>
);

export default Home;