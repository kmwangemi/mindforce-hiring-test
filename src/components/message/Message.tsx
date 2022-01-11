import './message.scss';

const Message: React.FC = ({ children }): JSX.Element => {
	return <div className='alert-danger'>{children}</div>;
};

export default Message;
