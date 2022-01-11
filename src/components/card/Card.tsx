import React, { useState } from 'react';
import { IState } from '../../types';
import InlineEdit from '../inlineedit/InlineEdit';
import './card.scss';

const Card: React.FC<IState['IProps']> = ({ album }) => {
	const [storedText, setStoredText] = useState<string>(album.title);

	return (
		<div className='card__Wrapper'>
			<div className='content__Wrapper'>
				<div className='content__container'>
					<img src={album.thumbnailUrl} alt={album.title} loading='lazy' />
					<InlineEdit
						text={storedText}
						onSetText={(text: string) => setStoredText(text)}
					/>
					<div className='date__Wrapper'>
						{Date.now()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
