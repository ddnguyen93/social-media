import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import { SocketContext } from '../../contexts/socket';

const Btn = styled.button``;

const SignOutBtn: FunctionComponent = () => {
	const { userData, setUserData } = useContext(AuthContext)!;
	const { socket } = useContext(SocketContext)!;

	const LogoutHandler = (event: any) => {
		event.preventDefault();
		socket.emit('sign-out');
		window.localStorage.removeItem('userData');
		setUserData(null);
	};
	return <Btn onClick={LogoutHandler}>Sign Out</Btn>;
};

export default SignOutBtn;
