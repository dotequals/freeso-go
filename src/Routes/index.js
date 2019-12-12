import React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from '../About';
import Advanced from '../Advanced';
import Community from '../Community';
import Installers from '../Installers';
import Settings from '../Settings';
import Game from '../Game';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/freeso"
        render={(props) => <Game {...props} game='FreeSO' />} 
      />
      <Route 
        exact
        path="/simitone" 
        render={(props) => <Game {...props} game='Simitone' />} 
      />
      <Route exact path="/installers" component={Installers} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/advanced" component={Advanced} />
      <Route exact path="/about" component={About} />
      <Route component={Community} />
    </Switch>
  );
};

export default Routes;