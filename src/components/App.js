import React from 'react';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import AppShell from './AppShell';

class App extends React.Component {
  render () {
    return (
       <MuiThemeProvider>
        <AppShell>
          Hello World!
        </AppShell>
      </MuiThemeProvider>
    );
  }
};

export default App;