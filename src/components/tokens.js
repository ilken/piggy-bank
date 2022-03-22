import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Tokens() {
	const [tokens, setTokens] = useState([]);
	// const [wallet, setWallet] = useState("0x2BB3CA261Bfdd2dcd82C512Fb3Cc78F72281E0A7");

	useEffect(() => {
		try {
			async function fetchTokens() {
				const DRIP = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333');
				const PIGS = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0x3a4c15f96b3b058ab3fb5faf1440cc19e7ae07ce');
				const DOGS = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0xdbdc73b95cc0d5e7e99dc95523045fc8d075fb9e');
				const BNB = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c');
				// const BUSD = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');

				BNB.data.data.symbol = 'BNB';

				setTokens([
					DRIP.data.data,
					PIGS.data.data,
					DOGS.data.data,
					BNB.data.data
				]);
			}
			fetchTokens();
		} catch(err) {
			console.error(err);
		}
	}, []);

	return <section className='tokens'>
		<div className='card --tokens'>
			<div className='card__body'>
				{!tokens.length && (
					<div className='tokens__loading'>
						<div className='tokens__loading__icon'/>
						<div className='tokens__loading__text'>Loading prices...</div>
					</div>
				)}
				<div className='tokens__list'>
					{tokens.map(token => {
						return <div key={token.symbol} className='token'>
							<div className={`token__icon --${token.symbol.toLowerCase()}`}/>
							{token.symbol} ${Number(token.price).toFixed(2)}
						</div>
					})}
				</div>
			</div>
		</div>
	</section>
}