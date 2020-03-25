import React, { Component } from 'react';

class Form extends Component {
	state = {
		fromCurrency: '',
		toCurrency: ''
	};
	onChange = e => this.setState({ [e.target.name]: e.target.value });
	render() {
		return (
			<form onSubmit={this.props.onSubmitHandler}>
				<input
					name='amount'
					type='number'
					placeholder='Amount'
					onChange={this.onChange}
				/>
				<input
					name='fromCurrency'
					type='text'
					placeholder='From Currency'
					onChange={this.onChange}
				/>
				<input
					name='toCurrency'
					type='text'
					placeholder='To Currency'
					onChange={this.onChange}
				/>
				<button type='submit'>Find Currency</button>
			</form>
		);
	}
}

export default Form;
