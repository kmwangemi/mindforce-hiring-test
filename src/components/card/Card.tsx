import { useState, FC } from 'react';
import { IState } from '../../types';
import InlineEdit from '../inlineedit/InlineEdit';
import './card.scss';

const Card: FC<IState['IProps']> = ({ album }): JSX.Element => {
	const [storedText, setStoredText] = useState<string>(album.title);

	function oddOrEven(num: number): string {
		return num & 1 ? 'odd' : 'even';
	}

	return (
		<div className='card__Wrapper'>
			<div
				className='content__Wrapper'
				style={{
					backgroundColor:
						oddOrEven(album.id) === 'even' ? 'gray' : 'white',
				}}
			>
				<div className='content__container'>
					<img src={album.thumbnailUrl} alt={album.title} loading='lazy' />
					<InlineEdit
						text={storedText}
						onSetText={(text: string) => setStoredText(text)}
					/>
					<div className='date__Wrapper'>{Date.now()}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
