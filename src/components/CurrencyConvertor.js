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
import img1 from './assets/img/money-min.jpg';
import currencyCodes from './currencyCodes';

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
		if (amt && fromCurr && toCurr) {
			if (
				currencyCodes.includes(fromCurr) &&
				currencyCodes.includes(toCurr)
			) {
				this.setState({
					fromCurrency: '' + event.target.fromCurrency.value,
					toCurrency: '' + event.target.toCurrency.value,
					loading: true,
					loaded: false,
					amount: amt
				});
				const response = await axios.get(
					`http://data.fixer.io/api/latest?access_key=${this.props.api}&symbols=${fromCurr},${toCurr}`
				);

				console.log(response);

				let rate = await response.data.rates;

				let euro = 1 / rate[fromCurr];

				let exchangeRate = euro * rate[toCurr];

				let convertAmount = (amt * exchangeRate).toFixed(2);

				this.setState({
					convertAmount,
					loading: false,
					loaded: true,
					error: false
				});
			} else {
				this.setState({ error: true });
			}
		} else {
			this.setState({ error: true });
		}
		// const response = await axios.get(
		// 	`http://api.currencylayer.com/live?access_key=${this.props.api}&currencies=${fromCurr},${toCurr}& format=1`
		// );
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
		if (this.state.error) {
			value = (
				<div className='container' style={{ color: 'red' }}>
					<h1>Please Enter Valid Values</h1>
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
