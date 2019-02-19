import React, {Component, lazy} from 'react';
import PropTypes from 'prop-types';

import Profile from './github/Profile.jsx';
import RepoList from './github/RepoList.jsx';
import Search from './github/Search.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {},
			userRepos: [],
			perPage: 5,
			page: 1
		};
	}

	static propTypes = {
		clientId: PropTypes.string.isRequired,
		clientSecret: PropTypes.string.isRequired
	};

	static defaultProps = {
		clientId: process.env.clientId,
		clientSecret: process.env.clientSecret
	};

	getUserData(username) {
		return $.ajax({
			url: `https://api.github.com/users/${username}`,
			data: {
				client_id: this.props.clientId,
				client_secret: this.props.clientSecret
			},
			dataType: 'json',
			cache: false,
		}).done((data) => {
			this.setState({
				userData: data,
				page: 1, 
				totalPages: Math.round((data.public_repos + this.state.perPage)/this.state.perPage)});
		}).fail((xhr, status, err) => {
			alert("Error: " + err);
		});
	};

	getRepos() {
		return $.ajax({
			url: `https://api.github.com/users/${this.state.userData.login}/repos`,
			data: {
				client_id: this.props.clientId,
				client_secret: this.props.clientSecret,
				per_page: this.state.perPage,
				page: this.state.page,
				sort: 'created'
			},
			dataType: 'json',
			cache: false,
		}).done((data) => {
			this.setState({userRepos: data});
		}).fail((xhr, status, err) => {
			this.setState({userRepos: []});
			alert("Error: " + err);
		});
	};

	componentDidMount() {
		this.getUserData(process.env.username).then(() => this.getRepos());
	}

	handleSearchSubmit = (username) => {
		this.getUserData(username).then(() => this.getRepos());
	}

	handleRepoNav = (forward) => {
		if ((forward && this.state.page < this.state.totalPages)
			|| (!forward && this.state.page > 1)) {
			this.setState({page: this.state.page + (forward ? 1 : -1)}, () => this.getRepos());
	}
}

render() {
	return(
		<div>
			<Search onFormSubmit={this.handleSearchSubmit} />
			<Profile userData={this.state.userData} />
			<h3>User Repositories</h3>
			<RepoList 
			userRepos={this.state.userRepos} 
			page={this.state.page} 
			perPage={this.state.perPage}
			onRepoNav={this.handleRepoNav}
			totalPages={this.state.totalPages} />
		</div>
		);
	}
}