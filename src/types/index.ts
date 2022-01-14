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
		// storedText: string;
		// setStoredText: React.Dispatch<React.SetStateAction<string>>;
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
