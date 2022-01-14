interface Props {
	AlbumsState: {
		albumId: number;
		id: number;
		title: string;
		url: string;
		thumbnailUrl: string;
	};
	IProps: {
		albumsList: Props['AlbumsState'][];
	};
}

const Mapper = (albumArray: any) => {
	return (
		Array.isArray(albumArray) &&
		albumArray.length &&
		albumArray.forEach((album: Props['AlbumsState']) => album)
	);
};

export default Mapper;
