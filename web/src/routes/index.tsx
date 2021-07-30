import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CreateLocalization from '../pages/CreateLocalization';
import CreatePolygon from '../pages/CreatePolygon';
import ListLocations from '../pages/ListLocations';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} isPrivate />
      <Route
        path="/localization/create"
        component={CreateLocalization}
        isPrivate
      />
      <Route
        path="/localization/polygon/create"
        component={CreatePolygon}
        isPrivate
      />
      <Route path="/locations/list" component={ListLocations} isPrivate />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
