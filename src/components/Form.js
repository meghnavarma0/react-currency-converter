import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
	state = {
		fromCurrency: '',
		toCurrency: ''
	};
	onChange = e => this.setState({ [e.target.name]: e.target.value });
	render() {
		return (
			<form
				className='form container'
				onSubmit={this.props.onSubmitHandler}
			>
				<input
					className='amt item'
					name='amount'
					type='number'
					placeholder='Amount'
					onChange={this.onChange}
				/>
				<input
					className='code item'
					name='fromCurrency'
					type='text'
					placeholder='From Currency- INR/EUR/USD'
					onChange={this.onChange}
				/>
				<input
					className='code item'
					name='toCurrency'
					type='text'
					placeholder='To Currency- INR/EUR/USD'
					onChange={this.onChange}
				/>
				<button className='btn item' type='submit'>
					Find Currency
				</button>
			</form>
		);
	}
}

export default Form;
