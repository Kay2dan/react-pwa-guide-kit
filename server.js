'use strict';

const path = require('path');
const express = require('express');
const {createElement} = require('react');
const {renderToString} = require('react-dom/server');
const {match, RouterContext} = require('react-router')
const babelRegister = require('babel-register');

// configuration
process.env.NODE_ENV = 'production';
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

babelRegister({
  only: /src/,
});

const routes = require('./src/routes').default;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'build'));
app.set('port', (process.env.PORT || 8080))
app.use(express.static('build'));

app.get('/', (req, res) => {
  match({
    routes: routes,
    location: req.url
  }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    const markup = renderToString(createElement(RouterContext, props, null));
    res.render('index', {markup: markup});  
  });
});

app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Running app at localhost:' + app.get('port'))
});
