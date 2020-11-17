import * as React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

export default [
  <Route exact path="/home" component={Dashboard} />,
  <Route exact path="/login" component={Login} noLayout />,
];
