import { FunctionComponent, useContext, useState } from 'react';
import { SocketContext } from '../contexts/socket';
import styled from 'styled-components';
import Lobby from '../components/Lobby/Lobby';
import Game from '../components/Game/Game';

const Container = styled.div`
	background-color: rgb(24, 61, 16);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MainPage: FunctionComponent = () => {
	const { socket } = useContext(SocketContext)!;
	const [lobby, setLobby] = useState<boolean>(true);

	const ClickHandler = (event: any) => {
		event.preventDefault();
		socket.emit('message', 'msg sent');
	};

	return <Container>{lobby ? <Lobby /> : <Game />}</Container>;
};

export default MainPage;
