import React from 'react';
import {
	Routes,
	Route,
	Link
} from "react-router-dom";
import Calculator from './components/calculator';
import Donation from './components/donation';
import Tokens from './components/tokens';
import './App.scss';

export default function App() {
	return (
		<div className="App">
			<section className="site-banner">
				We build FREE tools for the best crypto community in the world! - <a href="https://animalfarm.app/piggy-bank/0x2BB3CA261Bfdd2dcd82C512Fb3Cc78F72281E0A7" target="_blank" rel="noreferrer">Join our Piggy Bank team</a>
			</section>
			<header>
				<h1>Piggy Bank Calculator</h1>
				<p>Visit <a href="https://animalfarm.app/piggy-bank/0x2BB3CA261Bfdd2dcd82C512Fb3Cc78F72281E0A7" target="_blank" rel="noreferrer">the Animal Farm</a> to earn up to 3% ROI.</p>
			</header>
			
			<Routes>
				<Route exact path="/" element={<Home/>}/>
				<Route path="/calculator" element={<Calculator/>}/>
				<Route path="/tokens" element={<Tokens/>}/>
			</Routes>
			<Donation />
		</div>
	);
}

class Home extends React.Component {
	render() {
		return <React.Fragment>
			<Tokens/>
			<Calculator/>
		</React.Fragment>
	}
}