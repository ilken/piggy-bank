
import React from 'react';
import moment from 'moment';
import './App.scss';

function App() {
	return (
		<div className="App">
			<section className="site-banner">
				We build FREE tools for the best crypto community in the world! - <a href="https://theanimal.farm/piggybank/0x2BB3CA261Bfdd2dcd82C512Fb3Cc78F72281E0A7" target="_blank">Join our Piggy Bank team</a>
			</section>
			<header>
				<h1>Piggy Bank Calculator</h1>
				<p>Visit <a href="https://theanimal.farm/piggybank/0x2BB3CA261Bfdd2dcd82C512Fb3Cc78F72281E0A7" target="_blank">the Animal Farm</a> to earn up to 3% ROI.</p>
			</header>
			<Calculator />
			<DonationBox />
		</div>
	);
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			table: [],
			balance: 10,
			startDate: moment(),
			weeks: 4,
			bonusPercent: 10
		};
	}

	componentDidMount() {
		this.calculate();
	}

	getBonus = (weeks) => {
		const data = {
			1: 5,
			2: 6,
			3: 8,
			4: 10,
			5: 12,
			6: 15,
			7: 19,
			8: 23,
			9: 28,
			10: 33,
			11: 40,
			12: 47,
			13: 56,
			14: 67,
			15: 79,
			16: 93,
			17: 109,
			18: 127,
			19: 148,
			20: 172,
			21: 198,
			22: 228,
			23: 262,
			24: 299,
			25: 341,
			26: 386,
			27: 436,
			28: 491,
			29: 551,
			30: 616,
			31: 687,
			32: 763,
			33: 845,
			34: 933,
			35: 1028,
			36: 1129,
			37: 1236,
			38: 1351,
			39: 1472,
			40: 1601,
			41: 1738,
			42: 1882,
			43: 2034,
			44: 2194,
			45: 2363,
			46: 2541,
			47: 2728,
			48: 2925,
			49: 3131,
			50: 3348,
			51: 3575,
			52: 3813,
			53: 4062,
			54: 4323,
			55: 4597,
			56: 4883,
			57: 5182,
			58: 5495,
			59: 5823,
			60: 6165,
			61: 6522,
			62: 6896,
			63: 7286,
			64: 7693,
			65: 8119,
			66: 8563,
			67: 9026,
			68: 9510,
			69: 10014,
			70: 10540,
			71: 11089,
			72: 11661,
			73: 12257,
			74: 12879,
			75: 13527,
			76: 14203,
			77: 14907,
			78: 15640,
			79: 16404,
			80: 17199,
			81: 18028,
			82: 18891,
			83: 19789,
			84: 20724,
			85: 21698,
			86: 22711,
			87: 23766,
			88: 24863,
			89: 26005,
			90: 27193,
			91: 28429,
			92: 29715,
			93: 31052,
			94: 32442,
			95: 33888,
			96: 35392,
			97: 36955,
			98: 38580,
			99: 40270,
			100: 42026,
			101: 43851,
			102: 45748,
			103: 47719,
			104: 49767,
			105: 51392,
			106: 53061,
			107: 54777,
			108: 56540,
			109: 58351,
			110: 60213,
			111: 61821,
			112: 63464,
			113: 65142,
			114: 66856,
			115: 68607,
			116: 70049,
			117: 71513,
			118: 72999,
			119: 74508,
			120: 76039,
			121: 77594,
			122: 79172,
			123: 80774,
			124: 82400,
			125: 84050,
			126: 85726,
			127: 87426,
			128: 89152,
			129: 90904,
			130: 92681,
			131: 94485,
			132: 96316,
			133: 98174,
			134: 100060,
			135: 101973,
			136: 103915,
			137: 105886,
			138: 107885,
			139: 109914,
			140: 111973,
			141: 114062,
			142: 116181,
			143: 118332,
			144: 120514,
			145: 122727,
			146: 124973,
			147: 127252,
			148: 129563,
			149: 131908,
			150: 134287,
			151: 136701,
			152: 139149,
			153: 141632,
			154: 144152,
			155: 146707,
			156: 149299
		};

		return data[weeks] || 0;
	}

	timeWeightedBonus = (day) => {
		return Math.pow(day, 4.1);
	}

	calculate = () => {
		let {balance, weeks, startDate, bonusPercent} = this.state;
		startDate = moment(this.state.startDate, "DD/MM/YYYY");
		bonusPercent = this.state.bonusPercent / 100;

		if(!balance) balance = 1;
		if(!weeks) weeks = 1;
		const trufflePerPiglet = 2592000;
		const originalTruffleValue = 0.000028;
		const truffleDecay = 0.99;
		const daysSinceLaunch = moment().diff(moment("04/03/2022", "DD/MM/YYYY"), 'days');
		// const truffleValue = originalTruffleValue * Math.pow(truffleDecay, daysSinceLaunch);
		const truffleProductionRate = 86400;
		const lockupDays = weeks * 7;
		// const endDate = moment(startDate).add(lockupDays, 'days');
		const daysToEnableHigherBonus = parseInt(lockupDays * 0.75);
		const dailyRate = 1.03;
		const totalBonus = balance * bonusPercent;
		// const lowDailyBonusDays = parseInt(lockupDays * 0.75);
		// const highDailyBonusDays = lockupDays - lowDailyBonusDays;
		const totalTimeWeightedBonus = this.timeWeightedBonus(lockupDays);
		
		let bonusPaid = 0;
		let pendingTruffles = 0;
		let table = [];

		for(let day=0; day < lockupDays; day++) {
			const higherBonusEnabled = day >= daysToEnableHigherBonus;
			const dailyTimeWeightedBonusPercent = this.timeWeightedBonus(day+1) / totalTimeWeightedBonus;
			const dailyBonus = (totalBonus * dailyTimeWeightedBonusPercent) - bonusPaid;
			const decayDays = daysSinceLaunch + day;
			const truffleValue = originalTruffleValue * Math.pow(truffleDecay, decayDays);
			const dailyTruffles = (Number(balance) * truffleProductionRate);
			const canCompound = (Number(dailyTruffles) + Number(pendingTruffles)) >= trufflePerPiglet;

			if(canCompound) {
				let pendingBalance = pendingTruffles ? Number(pendingTruffles / trufflePerPiglet) : 0;
				balance = (Number(balance) + Number(pendingBalance) + Number(dailyBonus)) * dailyRate;
				bonusPaid += dailyBonus;
			}

			// console.log(`Day ${day+1} | Time Bonus: ${dailyTimeWeightedBonusPercent.toFixed(4)} | Truffle: ${truffleValue.toFixed(6)} | Bonus: ${dailyBonus.toFixed(3)} | Pending Truffles: ${pendingTruffles.toFixed(3)} | Balance: ${Number(balance).toFixed(3)}`);
			table.push({
				day: day + 1,
				date: moment(startDate).add(day + 1, 'days'),
				canCompound,
				higherBonusEnabled,
				dailyBonus,
				bonusPaid,
				balance,
				dailyTruffles: Number(dailyTruffles) + Number(pendingTruffles),
				dailyTrufflesValue: (Number(dailyTruffles) + Number(pendingTruffles)) * truffleValue
			});

			if(canCompound) pendingTruffles = 0
			else pendingTruffles += dailyTruffles
		}

		this.setState({table});
	}

	onBalanceChange = (e) => {
		let balance = e.target.value;
		if(isNaN(balance)) return;

		this.setState({balance})
	}

	onWeeksChange = (e) => {
		let weeks = e.target.value;
		if(isNaN(weeks)) return;
		if(weeks > 156) weeks = 156;
		const bonusPercent = this.getBonus(weeks);
		this.setState({weeks, bonusPercent});
	}

	onDateChange = (e) => {
		const date = e.target.value;
		this.setState({startDate: moment(date, "YYYY-MM-DD")})
	}

	render() {
		const {table, balance, weeks, bonusPercent, startDate} = this.state;

		return (
			<section className='calculator'>
				<div className="card --calculator-settings">
					<div className="card__body">
						<div className='calculator__settings'>
							<div className='calculator__settings__item'>
								<label className='calculator__settings__item__label'>Start date:</label>
								<input type="date" className='calculator__settings__item__input' value={moment(startDate).format("YYYY-MM-DD")} onChange={this.onDateChange}/>
							</div>
							<div className='calculator__settings__item'>
								<label className='calculator__settings__item__label'>Piglets:</label>
								<input type="number" className='calculator__settings__item__input --balance' value={balance} onChange={this.onBalanceChange}/>
							</div>
							<div className='calculator__settings__item'>
								<label className='calculator__settings__item__label'>Weeks:</label>
								<input type="number" className='calculator__settings__item__input --weeks' value={weeks} onChange={this.onWeeksChange}/>
							</div>
							<div className='calculator__settings__item'>
								<label className='calculator__settings__item__label'>Bonus:</label>
								<div className='calculator__settings__item__value'>{bonusPercent}%</div>
							</div>
							<div className='calculator__settings__item'>
								<button className='calculator__settings__item__button' onClick={this.calculate}>Go</button>
							</div>
						</div>
						<div className='calculator__colours'>
							<div className='calculator__colours__item'>
								<div className='calculator__colours__item__value --active'/>
								<div className='calculator__colours__item__text'>Can compound</div>
							</div>
							<div className='calculator__colours__item'>
								<div className='calculator__colours__item__value --pending'/>
								<div className='calculator__colours__item__text'>Below compound threshold (accumulating)</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card --calculator-table">
					<div className="card__body">
						<table className='calculator__table'>
							<thead>
								<tr>
									<th>Day</th>
									<th>Date</th>
									<th>Daily Bonus</th>
									<th>Total Bonus Paid</th>
									<th>Piglet Balance</th>
									<th>Daily Truffles Available</th>
								</tr>
							</thead>
							<tbody>
								{table.map(item => {
									return <tr key={`day-${item.day}`}>
										<td>{item.day}</td>
										<td>{moment(item.date).format("DD MMM YYYY")}</td>
										<td>{Number(item.dailyBonus).toFixed(3)}</td>
										<td>{Number(item.bonusPaid).toFixed(3)}</td>
										<td>{Number(item.balance).toFixed(2)}</td>
										<td className={`${item.canCompound ? "--active" : "--pending"}`}>
											{Number(item.dailyTruffles).toFixed(0)}
											<br/>
											<strong>≈ ${Number(item.dailyTrufflesValue).toFixed(2)}</strong>
										</td>
									</tr>
								})}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		);
	}
}

class DonationBox extends React.Component {
	render() {
		return <section className='donation'>
			<div className='card --donation'>
				<div className='card__body'>
					<div className='donation__content'>
						<div className='donation__title'>
							Would you like to contribute to our Piggy Bank?
						</div>
						<div className='donation__description'>
							We'll turn your support into coffee ☕ and code.
						</div>
						<div className='donation__wallet__label'>
							Donate $5 BUSD or more :) to:
						</div>
						<div className='donation__wallet'>
							0x2BB3CA261Bfdd2dcd82C512Fb3Cc78F72281E0A7
						</div>
						<div className='donation__wallet__footer'>
							5 BUSD ~ .015 BNB ~ .055 DRIP
						</div>
					</div>
					<div className='donation__img'/>
				</div>
			</div>
		</section>
	}
}

export default App;
