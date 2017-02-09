import React, {Component} from 'react';
import {Link} from 'react-router';
import {Avatar} from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import AvatarIcon from 'material-ui/svg-icons/action/account-circle';
import users from '../data/users.json'

const style = {
	marginBottom: '0.5em',
};

class User extends Component {
	render() {
		return (
			<Link to={`/users/${this.props.id}`}>
				<Card style={style}>
				<CardHeader
					title={`${this.props.name}`}
					subtitle={this.props.email}
					avatar={<Avatar icon={<AvatarIcon/>}/>}
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
	componentWillMount() {
		this.setState({
			users: users
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.params.id !== this.props.params.id;
	}

	render() {
		const userItems = () => {
			if (this.state.users) {
				if (!this.props.params.id) {
					return Object.keys(this.state.users).map((id, i) => {
						return <User key={`${id}-${i}`} id={id} {...this.state.users[id]}/>;
					});
				} else {
					return <User id={this.props.params.id} {...users[this.props.params.id]}/>;
				}
			}
		}

		return (
			<div>
				{userItems()}
			</div>
		);
	}
}

Users.propTypes = {
	params: React.PropTypes.object
};

export default Users;