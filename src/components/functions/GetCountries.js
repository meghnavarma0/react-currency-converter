import React, { Component } from 'react';
import axios from 'axios';

class GetCountries extends Component {
	state = {
		countries: ''
	};
	componentDidMount() {
		this.getCountries();
	}
	getCountries = async () => {
		const response = await axios.get(
			`http://restcountries.eu/rest/v2/currency/${this.props.toCurrency}`
		);

		this.setState({
			countries: response.data.map((country, index) => (
				<div key={index}>{country.name}</div>
			))
		});
	};
	render() {
		return <div>{this.state.countries}</div>;
	}
}
export default GetCountries;
