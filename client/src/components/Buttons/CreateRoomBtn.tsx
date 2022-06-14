import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { LobbyContext } from '../../contexts/LobbyContext';
import { AuthContext } from '../../contexts/AuthContext';
import { SocketContext } from '../../contexts/socket';

const Btn = styled.button`
	background-color: #0a0a23;
	color: #fff;
	border: none;
	border-radius: 10px;
	padding: 15px;
	min-height: 30px;
	min-width: 120px;
`;

const CreateRoomBtn: FunctionComponent = () => {
	const { socket } = useContext(SocketContext)!;
	const { roomClicked } = useContext(LobbyContext)!;
	const { userData } = useContext(AuthContext)!;


	return <Button>Create Room</Button>;
};

export default CreateRoomBtn;
