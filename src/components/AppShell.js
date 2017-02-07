import React, {Component} from 'react';
import {hashHistory, Link} from 'react-router';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {Drawer, AppBar, MenuItem} from 'material-ui';
import MainIcon from 'material-ui/svg-icons/navigation/apps';

class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleToggleDrawer = () => this.setState({open: !this.state.open});

  handleRequestChange = open => this.setState({open});

  render() {
    return (
      <MuiThemeProvider>
        <div id="app-shell">
          <AppBar
            title={this.props.title}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggleDrawer}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={this.handleRequestChange}>
              <MenuItem 
                primaryText={'Main'}
                leftIcon={<MainIcon/>}
                containerElement={<Link to={'/'}/>}
                onTouchTap={this.handleToggleDrawer}
              />
          </Drawer>
          <div id="content">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default AppShell;