import React from 'react';
import {Route, IndexRoute, hashHistory} from 'react-router';
import AppShell from './components/AppShell';

function load(cb) {
  return m => cb(null, m.default || m);
}

const routes = {
  path: '/',
  component: AppShell,
  childRoutes: [{
    getIndexRoute: (_, cb) => {
      cb(null, {
        getComponent: (_, cb) => {import('./components/Greeting').then(load(cb))}
      })
    }
  }, {
    path: 'users',
    getComponent(_, cb) {import('./components/Users').then(load(cb))},
    childRoutes: [{
    }]
  }, {
    path: 'users/:id',
    getComponent(_, cb) {import('./components/User').then(load(cb))}
  }, {
    path: 'notification',
    getComponent(_, cb) {import('./components/Notification').then(load(cb))}
  }]
};

export default routes;