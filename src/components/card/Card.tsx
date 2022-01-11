import React, { useState } from 'react';
import { IState } from '../../types';
import InlineEdit from '../inlineedit/InlineEdit';
import './card.scss';

const Card: React.FC<IState['IProps']> = ({ albumsList }) => {
	const [storedText, setStoredText] = useState<string>(
		"Here's some more, edit awayetretrtrt!"
	);

	const renderAlbums = (): JSX.Element[] => {
		return albumsList.map((album) => {
			return (
				<div className='content__Wrapper'>
					<div className='content__container'>
						<img
							src={album.thumbnailUrl}
							alt={album.title}
							loading='lazy'
						/>
                  <InlineEdit
                     text={storedText}
                     onSetText={(text) => setStoredText(text)}
                  />
					</div>
				</div>
			);
		});
	};

	return <div className='card__Wrapper'>{renderAlbums()}</div>;
};

export default Card;
