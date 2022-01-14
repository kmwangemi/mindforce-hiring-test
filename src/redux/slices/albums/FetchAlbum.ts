import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { IState } from '../../../types/index';

// https://jsonplaceholder.typicode.com/photos?_start=5&_end=10

// create album action
export const fetchAlbum = createAsyncThunk<
	IState['AlbumTypes'][],
	number,
	{ rejectValue: IState['FetchAlbumsError'] }
>('albums/fetch', async (limit: number, thunkApi) => {
	try {
		const { data } = await axios.get(
			`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
		);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue({
			message: 'Oops, there seems to be an error.',
		});
	}
});

const albumInfoFromStorage = sessionStorage.getItem('albumInfo')
	? JSON.parse(sessionStorage.getItem('albumInfo'))
	: [];

const initialState = {
	albumsList: albumInfoFromStorage,
	loading: false,
	error: null,
} as IState['AlbumsState'];

const fetchAlbumSlice = createSlice({
	name: 'albums',
	initialState,
	reducers: {
		update: (
			state,
			{ payload }: PayloadAction<{ id: number; title: string }>
		) => {
			const albumToEdit = state.albumsList.find(
				(album: IState['AlbumTypes']) => album.id === payload.id
			);
			if (albumToEdit) {
				albumToEdit.title = payload.title;
				sessionStorage.setItem(
					'albumInfo',
					JSON.stringify(state.albumsList)
				);
				// sessionStorage.setItem(
				// 	'albumResetInfo',
				// 	JSON.stringify(state.albumsList)
				// );
			}
		},
		reset: (state) => {
			let savedAlbumResetInfo = JSON.parse(
				sessionStorage.getItem('albumResetInfo')
			);
			if (savedAlbumResetInfo) {
				state.albumsList = savedAlbumResetInfo;
			}
		},
	},
	extraReducers: (builder) => {
		// handle pending state
		builder.addCase(fetchAlbum.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		// handle fulfilled state
		builder.addCase(fetchAlbum.fulfilled, (state, { payload }) => {
			state.loading = false;
			// state.albumsList = payload;
			sessionStorage.setItem('albumInfo', JSON.stringify(payload));
			sessionStorage.setItem('albumResetInfo', JSON.stringify(payload));
			state.albumsList = albumInfoFromStorage;
		});
		// handle reject state
		builder.addCase(fetchAlbum.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.loading = false;
		});
	},
});

export const {
	update: updateAlbumActionCreator,
	reset: resetAlbumActionCreator,
} = fetchAlbumSlice.actions;

export default fetchAlbumSlice.reducer;
