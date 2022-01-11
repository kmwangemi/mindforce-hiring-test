import { configureStore } from '@reduxjs/toolkit';
import albumReducer from '../slices/albums/FetchAlbum';

// const initialState = {
// 	cart: {
// 		cartItems: localStorage.getItem('cartItems')
// 			? JSON.parse(localStorage.getItem('cartItems'))
// 			: [],
// 	},
// };

const store = configureStore({
	reducer: {
		album: albumReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>

export default store;
