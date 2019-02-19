import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.username = React.createRef();
	}

	static propTypes = {
		onFormSubmit: PropTypes.func.isRequired
	};

	onSubmit = (e) => {
		e.preventDefault();
		let username = this.username.current.value.trim();

		if (!username) {
			alert('Please enter a username.');
		} else {
			this.props.onFormSubmit(username);
			this.username.current.value = '';
		}
	}

	render() {
		return (
			<div className='panel'>
				<form onSubmit={this.onSubmit}>
					<label>Search GitHub Users</label>
					<input type="text" ref={this.username} className="form-control"></input>
				</form>
			</div>
			);
	}
	
}