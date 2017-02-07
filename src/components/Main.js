import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class Main extends Component {
  render () {
    return (
      <div>
        <Card>
          <CardHeader><h3>Hello! World</h3></CardHeader>
          <CardText>
            You will have a work:
            <ul>
              <li>Web Manifest for installing</li>
              <li>Service Worker for caching and offline</li>
              <li>Application Shell powered by <a href="https://material-ui.com">material-ui</a></li>
              <li>PRPL pattern by code splitting</li>
              <li>Opt in ES2015</li>
            </ul>
          </CardText>
        </Card>
      </div>
    )
  }
};

export default Main;