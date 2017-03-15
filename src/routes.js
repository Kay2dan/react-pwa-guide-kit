import React from 'react';
import {Route, IndexRoute, hashHistory} from 'react-router';
import AppShell from './components/AppShell';

// Polyfill require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = function(d, c) {
    c(require)
  };
}

const routes = {
  path: '/',
  component: AppShell,
  childRoutes: [{
    getIndexRoute: (_, cb) => {
      cb(null, {
        getComponent: (_, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Greeting').default)
          }, 'greeting');
        }
      });
    }
  }, {
    path: 'users',
    getComponent: (_, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/Users').default)
      }, 'users');
    }
  }, {
    path: 'users/:id',
    getComponent: (_, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/Users').default)
      }, 'users');
    }
  }, {
    path: 'notification',
    getComponent: (_, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/Notification').default)
      }, 'notification');
    }
  }]
};

export default routes;