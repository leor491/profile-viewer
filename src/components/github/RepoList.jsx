import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class RepoList extends Component {
	static propTypes = {
		userRepos: PropTypes.array.isRequired,
		page: PropTypes.number.isRequired,
		perPage: PropTypes.number.isRequired,
		totalPages: PropTypes.number.isRequired,
		onRepoNav: PropTypes.func.isRequired
	};

	static defaultProps = {
		totalPages: 1
	};

	onRepoNav(forward) {
		//forward.preventDefault();
		this.props.onRepoNav(forward);
	}

	render = () => {
		return (
			<div>
				<ul className="list-group">
				{
					this.props.userRepos.map(repo => {
						return (
							<li className="list-group-item" key={repo.id}>
								<a href={repo.html_url} target='_blank'>
									{repo.name}
								</a>
								<p>{repo.description}</p>
							</li>
							);
					})
				}
				</ul>
				<nav aria-label="...">
					<ul className="pager">
						<li className={this.props.page === 1 ? 'previous disabled' : 'previous'}>
							<a onClick={() => {this.onRepoNav(false)}}><span aria-hidden="true">&larr;</span> Previous</a>
						</li>
						<li className={this.props.page === this.props.totalPages ? 'next disabled' : 'next'}>
							<a onClick={() => {this.onRepoNav(true)}}>Next <span aria-hidden="true">&rarr;</span></a>
						</li>
					</ul>
				</nav>
			</div>
			);
		}	
	}
