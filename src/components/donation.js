import React from 'react';

export default function Donation() {
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