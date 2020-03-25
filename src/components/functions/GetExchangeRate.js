import React, { Component } from 'react';
import axios from 'axios';
class GetExchangeRate extends Component {
	state = {
		exchangeRate: 0
	};
	componentDidMount() {
		this.getExchangeRate();
	}
	getExchangeRate = async () => {
		const response = await axios.get(
			`http://api.currencylayer.com/live?access_key=${this.props.api}&currencies=${this.props.fromCurrency},${this.props.toCurrency}& format=1`
		);
		console.log(response);
		const rate = response.data.quotes;
		const euro = 1 / rate['USD' + this.props.fromCurrency];
		const exchangeRate = euro * rate['USD' + this.props.toCurrency];
		this.setState({ exchangeRate });
	};
	render() {
		return <h1>{this.state.exchangeRate}</h1>;
	}
}

export default GetExchangeRate;
