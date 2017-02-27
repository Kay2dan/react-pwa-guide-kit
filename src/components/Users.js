import React, {Component} from 'react';
import {Link} from 'react-router';
import {Avatar, Dialog, FlatButton, TextField, FloatingActionButton} from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import UsersDatabase from '../services/UsersDatabase';
import * as Icons from './Icons';

const style = {
	card: {
		marginBottom: '0.5em'
	},
	fb: {
		position: 'fixed',
		bottom: '20px',
		right: '20px'
	}
};

class User extends Component {
	render() {
		return (
			<Link to={`/users/${this.props.id}`}>
				<Card style={style.card}>
				<CardHeader
					title={this.props.name}
					subtitle={this.props.email}
					avatar={<Avatar icon={<Icons.Avatar/>}/>}
				/>
				</Card>
			</Link>
		);
	}
}

User.propTypes = {
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	email: React.PropTypes.string
};

class Users extends Component {
	constructor(props) {
		super(props);

		this.store = new UsersDatabase();

		this.state = {
			users: this.store.data(),
			dialog: false
		};
	}

	componentWillMount() {
		this.store.get().then(users => {
			this.setState({users});
		}).catch(function(err) {  
			console.log(`Fetch Error ${err.toString()}`);
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

		this.store.post(user).then(users => {
			this.setState({
				users: users,
				dialog: false
			});
		}).catch(function(err) {
			console.log(`Fetch Error ${err.toString()}`);
		});
	}

	render() {
		const users = () => {
			if (this.state.users) {
				const user = (id, i) => (<User key={`${id}-${i}`} id={id} {...this.state.users[id]}/>);

				if (this.props.params.id) {
					return user(this.props.params.id, 0);
				} else {
					return Object.keys(this.state.users).map((id, i) => user(id, i));
				}
			}
		}

		return (
			<div>
				{users()}
				<FloatingActionButton style={style.fb} onTouchTap={this.handleOpenDialog}>
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