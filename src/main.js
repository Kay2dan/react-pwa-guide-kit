import React from 'react';
import {render} from 'react-dom';
import reactTabEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import {Router, hashHistory} from 'react-router';

reactTabEventPlugin();

render(<Router history={hashHistory} routes={routes}/>, document.getElementById('app'));