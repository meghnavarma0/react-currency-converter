import React from 'react';
import CurrencyConverter from './components/CurrencyConvertor';
import './App.css';

function App() {
	// const ACCESS_KEY = 'ed1e2a257925d7b2867b3947f0577079';
	const api = '8429973cf33ecd0f7520c356eaf28f62';
	return (
		<div className='App'>
			<header className='container'>
				<h1>Currency Converter</h1>
			</header>
			{/* <CurrencyConverter api={ACCESS_KEY} /> */}
			<CurrencyConverter api={api} />
		</div>
	);
}

export default App;
