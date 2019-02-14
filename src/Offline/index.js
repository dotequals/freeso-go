import React from 'react';

import Container from "../Container";
import Header from "../Header";
import Scrollable from "../Scrollable";
import Main from "../Main";

const Offline = () => (
  <Container>
    <Header title="Oops!" />
    <Scrollable>
      <Main>
        This page requires an internet connection.
      </Main>
    </Scrollable>
  </Container>
);

export default Offline;