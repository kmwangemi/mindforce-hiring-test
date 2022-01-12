import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbum } from './redux/slices/albums/FetchAlbum';
import { RootState } from './redux/store/store';
import Loader from './components/loader/Loader';
import Message from './components/message/Message';
import Card from './components/card/Card';

import './App.scss';

const App: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAlbum(15));
	}, [dispatch]);

	// select store state
	const album = useSelector((state: RootState) => state.album);
	const { albumsList, loading, error } = album;
	return (
		<div className='Wrapper'>
			<main>
				{loading ? (
					<div className='loader__container'>
						<Loader />
					</div>
				) : error ? (
					<div className='error__container'>
						<Message>{error}</Message>
					</div>
				) : (
					albumsList.map((album) => <Card key={album.id} album={album} />)
				)}
			</main>
			<div className='button__Container'>
				<div className='reset__Wrapper'>
					<button type='reset'>Reset</button>
				</div>
				<div className='update__Wrapper'>
					<button type='submit'>Confirm Update</button>
				</div>
			</div>
		</div>
	);
};

export default App;
