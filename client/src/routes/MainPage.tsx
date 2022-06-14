import { FunctionComponent, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SocketContext } from '../contexts/socket';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import Lobby from '../components/Lobby/Lobby';
import Game from '../components/Game/Game';
import { LobbyContext } from '../contexts/LobbyContext';

const Container = styled.div``;

const MainPage: FunctionComponent = () => {
	const { socket } = useContext(SocketContext)!;
	const { userData, setUserData } = useContext(AuthContext)!;
	const { inLobby } = useContext(LobbyContext)!;

	return (
		<>
			{!userData && <Navigate replace to="/login" />}
			<Container>{inLobby ? <Lobby /> : <Game />}</Container>
		</>
	);
};

export default MainPage;
