// API's
// API to find country name based on currency:
// https://restcountries.eu/rest/v2/currency/{currency}

//API to get currency exchange rates :
// http://api.currencylayer.com/live?access_key=${ACCESS_KEY}&currencies=${currencies separated by commas}& format=1

import React, { Component } from 'react';
import axios from 'axios';

import GetCountries from './functions/GetCountries';
import Form from './Form';
import './CurrencyContainer.css';
import img1 from './assets/img/money.jpg';

class CurrencyConverter extends Component {
	state = {
		fromCurrency: 'INR',
		toCurrency: 'USD',

		convertAmount: 0,
		amount: 5,

		loading: false,
		loaded: false,
		error: false
	};
	componentDidMount() {
		// this.convertCurrency();
	}
	onSubmitHandler = async event => {
		event.preventDefault();

		let fromCurr = event.target.fromCurrency.value;
		let toCurr = event.target.toCurrency.value;
		let amt = event.target.amount.value;
		this.setState({
			fromCurrency: '' + event.target.fromCurrency.value,
			toCurrency: '' + event.target.toCurrency.value,
			loading: true,
			loaded: false,
			amount: amt
		});
		const response = await axios.get(
			`https://api.currencylayer.com/live?access_key=${this.props.api}&currencies=${fromCurr},${toCurr}& format=1`
		);

		let rate = response.data.quotes;

		let euro = 1 / rate['USD' + this.state.fromCurrency];

		let exchangeRate = euro * rate['USD' + this.state.toCurrency];

		let convertAmount = (this.state.amount * exchangeRate).toFixed(2);

		this.setState({ convertAmount, loading: false, loaded: true });
	};

	render() {
		let value = (
			<h5 className='container'>
				<img src={img1} alt='abc' className='image item' />
			</h5>
		);
		if (this.state.loading) {
			value = (
				<div className='loader'>
					<div className='lds-roller'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>{' '}
					</div>
				</div>
			);
		}

		if (this.state.loaded) {
			value = (
				<div className='card container'>
					<h1>
						{`${this.state.amount} ${this.state.fromCurrency} is worth ${this.state.convertAmount} ${this.state.toCurrency}. you can spend these in the following countries: ${this.state.countries}`}
					</h1>
					<GetCountries toCurrency={this.state.toCurrency} />
				</div>
			);
		}
		return (
			<div>
				<Form onSubmitHandler={this.onSubmitHandler} />
				{value}
			</div>
		);
	}
}

export default CurrencyConverter;
