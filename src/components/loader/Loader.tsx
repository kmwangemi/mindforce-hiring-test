import './loader.scss';

const Loader: React.FC = (): JSX.Element => {
	return (
		<div className='loading'>
			<i className='fa fa-spinner fa-spin'></i>
			<p>Loading...</p>
		</div>
	);
};

export default Loader;
