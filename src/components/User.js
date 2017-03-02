import React, {Component} from 'react';
import {Link} from 'react-router';
import {Avatar} from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import usersDatabase from '../services/UsersDatabase';
import * as Icons from './Icons';

const style = {
	marginBottom: '0.3em'
};

class User extends Component {
	constructor(props) {
		super(props);

		this.state = Object.assign({}, props.params, props);
	}

	componentWillMount() {
		if (this.state.id && !this.state.user) {
			const user = usersDatabase().data(this.state.id);
			
			if (user) {
				this.setState({user});
			} else {
				usersDatabase().get().then(users => {
					this.setState({
						user: usersDatabase().data(this.state.id)
					});
				}).catch(err => {
					console.log(err);
				});
			}
		}		
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.id !== (nextProps.params && nextProps.params.id) || 
				this.state.user !== nextState.user) {
			return true;
		}

		return false;
	}
	
	render() {
		return (
			<Card style={style}>
				<CardHeader
					title={this.state.user ? this.state.user.name : ''}
					subtitle={this.state.user ? this.state.user.email : ''}
					avatar={<Avatar icon={<Icons.Avatar/>}/>}
				/>
			</Card>
		);
	}
}

User.propTypes = {
	user: React.PropTypes.object,
};

export default User;