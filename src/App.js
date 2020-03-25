import React from 'react';
import CurrencyConverter from './components/CurrencyConvertor';
import './App.css';

function App() {
	const ACCESS_KEY = 'ed1e2a257925d7b2867b3947f0577079';
	return (
		<div className='App'>
			<CurrencyConverter api={ACCESS_KEY} />
		</div>
	);
}

export default App;
