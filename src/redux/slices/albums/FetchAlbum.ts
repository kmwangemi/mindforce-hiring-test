import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { IState } from '../../../types/index';

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

const initialState = {
	albumsList: [],
	loading: false,
	error: null,
} as IState['AlbumsState'];

const fetchAlbumSlice = createSlice({
	name: 'albums',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// handle pending state
		builder.addCase(fetchAlbum.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		// handle fulfilled state
		builder.addCase(fetchAlbum.fulfilled, (state, { payload }) => {
			state.albumsList = payload;
			state.loading = false;
		});
		// handle reject state
		builder.addCase(fetchAlbum.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.loading = false;
		});
	},
});

export default fetchAlbumSlice.reducer;
