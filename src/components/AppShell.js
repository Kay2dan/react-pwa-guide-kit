import React, {Component} from 'react';
import {hashHistory, Link} from 'react-router';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {Drawer, AppBar, MenuItem} from 'material-ui';
import * as Icons from './Icons';

const style = {
  width: '90%',
  margin: 'auto',
  marginTop: '30px'
};

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
        <div>
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
                leftIcon={<Icons.Main/>}
                containerElement={<Link to={'/'}/>}
                onTouchTap={this.handleToggleDrawer}
              />
              <MenuItem 
                primaryText={'Users'}
                leftIcon={<Icons.Users/>}
                containerElement={<Link to={'/users'}/>}
                onTouchTap={this.handleToggleDrawer}
              />
              <MenuItem 
                primaryText={'Notification'}
                leftIcon={<Icons.Notification/>}
                containerElement={<Link to={'/notification'}/>}
                onTouchTap={this.handleToggleDrawer}
              />
          </Drawer>
          <div id="content" style={style}>
            {/*{this.props.children}*/}
            {React.cloneElement(this.props.children, {msg: 'Hello world'})}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default AppShell;