export interface IState {
	AlbumTypes: {
		albumId: number;
		id: number;
		title: string;
		url: string;
		thumbnailUrl: string;
	};
	IProps: {
		album: IState['AlbumTypes'];
	};
	AlbumsState: {
		albumsList: IState['AlbumTypes'][];
		loading: boolean;
		error: string | null;
	};
	FetchAlbumsError: {
		message: string;
	};
}
