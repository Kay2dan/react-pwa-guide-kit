class UsersDatabase {
	constructor() {
		this.baseURL = FIREBASE_CONFIG.databaseURL;
		this.users = {};
	}

	data = (id) => id ? this.users[id] : this.users;

	get = () => {
		return fetch(`${this.baseURL}?orderBy="name"`).then(res => {
			if (res.status !== 200) {
				throw new Error(res.statusText);
			}

			return res.json().then(users => this.users = users);
		});
	}

	post = (user = {}) => {
		return fetch(this.baseURL, {
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

export default function () {
	if (!usersDatabaseSingleton) {
		usersDatabaseSingleton = new UsersDatabase();
	}
	
	return usersDatabaseSingleton;
}