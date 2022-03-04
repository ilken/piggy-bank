
import React from 'react';
import moment from 'moment';
import './App.scss';

function App() {
	return (
		<div className="App">
			<header>
				<h1>Piggy Bank Calculator</h1>
				<p>Visit <a href="https://theanimal.farm/piggybank/0x2BB3CA261Bfdd2dcd82C512Fb3Cc78F72281E0A7" target="_blank">the Animal Farm</a> to earn up to 3% ROI.</p>
			</header>
			<Calculator />
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
			bonusPercent: 20
		};
	}

	componentDidMount() {
		this.calculate();
	}

	getBonus = (weeks) => {
		const data = {
			1: 10,
			2: 13,
			3: 16,
			4: 20,
			5: 25,
			6: 31,
			7: 38,
			8: 46,
			9: 56,
			10: 67,
			11: 80,
			12: 95,
			13: 113,
			14: 134,
			15: 158,
			16: 186,
			17: 218,
			18: 255,
			19: 297,
			20: 344,
			21: 397,
			22: 457,
			23: 524,
			24: 599,
			25: 682,
			26: 773,
			27: 873,
			28: 983,
			29: 1103,
			30: 1233,
			31: 1374,
			32: 1527,
			33: 1691,
			34: 1867,
			35: 2056,
			36: 2258,
			37: 2473,
			38: 2702,
			39: 2945,
			40: 3203,
			41: 3476,
			42: 3764,
			43: 4068,
			44: 4389,
			45: 4727,
			46: 5083,
			47: 5457,
			48: 5850,
			49: 6263,
			50: 6696,
			51: 7150,
			52: 7626,
			53: 8125,
			54: 8646,
			55: 9194,
			56: 9766,
			57: 10365,
			58: 10991,
			59: 11646,
			60: 12330,
			61: 13045,
			62: 13792,
			63: 14572,
			64: 15387,
			65: 16238,
			66: 17126,
			67: 18053,
			68: 19020,
			69: 20029,
			70: 21081,
			71: 22178,
			72: 23322,
			73: 24515,
			74: 25759,
			75: 27055,
			76: 28406,
			77: 29814,
			78: 31280,
			79: 32808,
			80: 34399,
			81: 36056,
			82: 37782,
			83: 39579,
			84: 41449,
			85: 43396,
			86: 45423,
			87: 47532,
			88: 49727,
			89: 52011,
			90: 54387,
			91: 56859,
			92: 59430,
			93: 62104,
			94: 64885,
			95: 67777,
			96: 70784,
			97: 73911,
			98: 77161,
			99: 80540,
			100: 84052,
			101: 87702,
			102: 91496,
			103: 95438,
			104: 99535,
			105: 102784,
			106: 106123,
			107: 109554,
			108: 113080,
			109: 116703,
			110: 120426,
			111: 123642,
			112: 126928,
			113: 130284,
			114: 133713,
			115: 137215,
			116: 140099,
			117: 143027,
			118: 145999,
			119: 149016,
			120: 152079,
			121: 155188,
			122: 158344,
			123: 161548,
			124: 164800,
			125: 168101,
			126: 171452,
			127: 174853,
			128: 178305,
			129: 181808,
			130: 185363,
			131: 188971,
			132: 192633,
			133: 196349,
			134: 200120,
			135: 203947,
			136: 207831,
			137: 211772,
			138: 215771,
			139: 219829,
			140: 223946,
			141: 228124,
			142: 232363,
			143: 236664,
			144: 241028,
			145: 245455,
			146: 249947,
			147: 254504,
			148: 259127,
			149: 263817,
			150: 268575,
			151: 273402,
			152: 278298,
			153: 283265,
			154: 288304,
			155: 293415,
			156: 298599
		};

		return data[weeks] || 0;
	}

	calculate = () => {
		let {balance, weeks, startDate, bonusPercent} = this.state;
		startDate = moment(this.state.startDate, "DD/MM/YYYY");
		bonusPercent = this.state.bonusPercent / 100;

		if(!balance) balance = 1;
		if(!weeks) weeks = 1;
		const lockupDays = weeks * 7;
		// const endDate = moment(startDate).add(lockupDays, 'days');
		const daysToEnableHigherBonus = parseInt(lockupDays * 0.75);
		const dailyRate = 1.03;
		const totalBonus = balance * bonusPercent;
		const lowDailyBonusDays = parseInt(lockupDays * 0.75);
		const highDailyBonusDays = lockupDays - lowDailyBonusDays;
		const lowDailyBonus = (totalBonus * 0.3) / lowDailyBonusDays;
		const highDailyBonus = (totalBonus * 0.7) / highDailyBonusDays;
		
		let totalDailyBonus = 0;
		let table = [{
			day: 0,
			date: moment(startDate),
			higherBonusEnabled: false,
			dailyBonus: 0,
			totalDailyBonus: 0,
			balance
		}];

		for(let day=0; day < lockupDays; day++) {
			const higherBonusEnabled = day >= daysToEnableHigherBonus;
			const dailyBonus = higherBonusEnabled ? highDailyBonus : lowDailyBonus;
			balance = (Number(balance) + Number(dailyBonus)) * dailyRate;
			totalDailyBonus += dailyBonus;
			console.log(`Day ${day+1} | HighBonus: ${higherBonusEnabled} | Bonus: ${dailyBonus.toFixed(3)} | Balance: ${balance.toFixed(3)}`);
			table.push({
				day: day + 1,
				date: moment(startDate).add(day + 1, 'days'),
				higherBonusEnabled,
				dailyBonus,
				totalDailyBonus,
				balance
			})
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
								</tr>
							</thead>
							<tbody>
								{table.map(item => {
									return <tr key={`day-${item.day}`}>
										<td>{item.day}</td>
										<td>{moment(item.date).format("DD MMM YYYY")}</td>
										<td>{Number(item.dailyBonus).toFixed(3)}</td>
										<td>{Number(item.totalDailyBonus).toFixed(3)}</td>
										<td>{Number(item.balance).toFixed(2)}</td>
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

export default App;
