import { FunctionComponent, useContext } from 'react';
import { SocketContext } from '../contexts/socket';

const MainPage: FunctionComponent = () => {
	const { socket } = useContext(SocketContext)!;

	const ClickHandler = (event: any) => {
		event.preventDefault();
		socket.emit('message', 'msg sent');
	};

	return (
		<div>
			MainPage
			<button onClick={ClickHandler}>Click Here</button>
		</div>
	);
};

export default MainPage;
