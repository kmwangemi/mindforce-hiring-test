import { configureStore } from '@reduxjs/toolkit';
import albumReducer from '../slices/albums/FetchAlbum';

const store = configureStore({
	reducer: {
		album: albumReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>

export default store;
