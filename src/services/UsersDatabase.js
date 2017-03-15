class UsersDatabase {
	constructor(opts) {
		this.databaseURL = opts.databaseURL;
		this.users = {};
	}

	data = (id) => id ? this.users[id] : this.users;

	get = () => {
		return fetch(`${this.databaseURL}?orderBy="name"`).then(res => {
			if (res.status !== 200) {
				throw new Error(res.statusText);
			}

			return res.json().then(users => this.users = users);
		});
	}

	post = (user = {}) => {
		return fetch(this.databaseURL, {
			method: 'POST',
			body: JSON.stringify(user)
		}).then(res => {
			if (res.status !== 200) {
				throw new Error(res.statusText);
			}

			return res.json().then(data => {
				this.users[data.name] = user;
				return this.users;
			});
		});
	}
}

let usersDatabaseSingleton = null;

export default function (opts) {
	if (!usersDatabaseSingleton) {
		usersDatabaseSingleton = new UsersDatabase(opts);
	}
	
	return usersDatabaseSingleton;
}