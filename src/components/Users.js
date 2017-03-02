import React, {Component} from 'react';
import {Link} from 'react-router';
import {Avatar, Dialog, FlatButton, TextField, FloatingActionButton} from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import User from './User'
import usersDatabase from '../services/UsersDatabase';
import * as Icons from './Icons';

const fabStyle = {
	position: 'fixed',
	bottom: '20px',
	right: '20px'
};

class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: usersDatabase().data(),
			dialog: false
		};
	}

	componentWillMount() {
		usersDatabase().get()
			.then(users => this.setState({users}))
			.catch(err => {
			console.log(err);
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state !== nextState || nextProps.params.id !== this.props.params.id;
	}

	handleOpenDialog = () => this.setState({dialog: true})

	handleCloseDialog = () => this.setState({dialog: false})

	handleSubmit = () => {
		const user = {
			name: this.nameText.getValue(),
			email: this.emailText.getValue()
		};

		if (!user.name || !user.email) {
			this.handleCloseDialog();
			return;
		}

		usersDatabase().post(user).then(users => {
			this.setState({
				users: usersDatabase().data(),
				dialog: false
			});
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		const users = () => {
			if (!this.state.users) {
				return;
			}
			
			return Object.keys(this.state.users).map(id => {
				return (
					<Link key={id} to={`/users/${id}`}>
						<User user={this.state.users[id]}/>
					</Link>
				);
			});
		};

		return (
			<div>
				{users()}
				<FloatingActionButton style={fabStyle} onTouchTap={this.handleOpenDialog}>
					<Icons.ContentAdd/>
				</FloatingActionButton>
				<Dialog
					title="Adding New User"
					actions={<FlatButton label="Submit" primary={true} onTouchTap={this.handleSubmit}/>}
					modal={false}
					open={this.state.dialog}
					onRequestClose={this.handleCloseDialog}
				>
					<div>
						Input your name and email address.
					</div>
					<TextField hintText="Name" name="name" ref={ref => this.nameText = ref}/>
					<TextField hintText="Email" name="email" ref={ref => this.emailText = ref}/>
				</Dialog>
			</div>
		);
	}
}

Users.propTypes = {
	params: React.PropTypes.object
};

export default Users;