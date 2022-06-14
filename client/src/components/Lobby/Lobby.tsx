import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import ActionBar from './ActionBar';
import Rooms from './Rooms';

const Container = styled.div`
	height: 600px;
	width: 800px;
	border: solid 1px;
	background-color: #925050;
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

const RoomContainer = styled.div`
	height: 80%;
	overflow: auto;
`;

const Lobby: FunctionComponent = () => {
	return (
		<Container>
			<RoomContainer>
				<Rooms />
			</RoomContainer>
			<ActionBar />
		</Container>
	);
};

export default Lobby;
