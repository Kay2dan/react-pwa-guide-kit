import React from 'react';
import {Drawer, AppBar, MenuItem} from 'material-ui';

export default class AppShell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false
    };
  }

  handleToggleDrawer = () => this.setState({drawerOpen: !this.state.drawerOpen});

  handleRequestChange = drawerOpen => this.setState({drawerOpen});

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggleDrawer}/>
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={this.handleRequestChange}>
            <MenuItem primaryText="Greeting"/>
            <MenuItem primaryText="Contact"/>
        </Drawer>
        <div id="content">
					{this.props.children}
				</div>
      </div>
    );
  }
};