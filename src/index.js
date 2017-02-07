import React from 'react';
import {render} from 'react-dom';
import reactTabEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

reactTabEventPlugin();

render(<App/>, document.getElementById("app"));