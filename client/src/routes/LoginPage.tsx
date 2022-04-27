import {
	FunctionComponent,
	useRef,
	useState,
	FormEvent,
	useContext,
	useEffect,
} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SocketContext } from '../contexts/socket';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	height: 500px;
	max-width: 90%;
`;

const PageTitle = styled.h1`
	color: white;
	margin: 15px 0px;
	font-size: 200%;
`;

const FormTitle = styled.h2`
	color: white;
	margin: 5px;
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 10px;
	font-size: 1rem;
	align-items: center;
`;

const Input = styled.input`
	background-color: transparent;
	border-width: 0px 0px 2px 0px;
	color: #ffffff;
	outline: none;
	font-size: 1.2rem;
	margin: 5px;
	padding: 5px;
`;

const Btn = styled.button`
	margin-top: 15px;
	font-size: 1.2rem;
	background-color: rgb(104, 0, 0);
	border-radius: 5px;
	padding: 5px;
	border: none;
	color: white;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 1);
	transition: all 0.2s ease 0s;
	width: 80%;

	&:hover {
		cursor: pointer;
	}

	&:active {
		transform: translateY(3px);
	}
`;

const NewAccountContainer = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NewAccountMsg = styled.p`
	margin: 5px;
`;

const ErrorContainer = styled.div`
	margin: 30px 0px;
	padding: 10px;
	background-color: #4e1010;
	border-radius: 10px;
	width: 60%;
	color: white;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 1);
`;

const LoginPage: FunctionComponent = () => {
	const email = useRef<HTMLInputElement | null>(null);
	const password = useRef<HTMLInputElement | null>(null);
	const tempUsername = useRef<HTMLInputElement | null>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const { socket } = useContext(SocketContext)!;
	const { userData, setUserData } = useContext(AuthContext)!;

	const loginHandler = async (event: FormEvent<EventTarget>) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email.current!.value,
					password: password.current!.value,
				}),
			});
			const responseData = await response.json();
			if (responseData.error) {
				setErrorMessage(responseData.error);
			} else {
				const data = {
					username: responseData.username,
					tempUser: false,
					userId: responseData.userId,
					JWT: responseData.token,
				};
				socket.emit('user-login', responseData.username);
				localStorage.setItem('userData', JSON.stringify(data));
				setUserData(data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const tempLoginHandler = async (event: FormEvent<EventTarget>) => {
		event.preventDefault();
		socket.emit('temp-user-login', tempUsername.current!.value);
	};

	socket.on('username-available', () => {
		setUserData({
			username: tempUsername.current!.value,
			tempUser: true,
			userId: null,
			JWT: null,
		});
	});

	socket.on('username-taken', (message) => {
		setErrorMessage(message);
	});

	return (
		<Container>
			{userData && <Navigate replace to="/" />}
			<PageTitle>Vietnamese Big Two</PageTitle>
			<LoginForm onSubmit={loginHandler}>
				<Input ref={email} type="email" required placeholder="Email" />
				<Input ref={password} type="password" required placeholder="Password" />
				<Btn type="submit">Sign In</Btn>
			</LoginForm>
			<FormTitle>Or</FormTitle>
			<LoginForm onSubmit={tempLoginHandler}>
				<Input
					ref={tempUsername}
					type="text"
					required
					placeholder="Temp Username"
				/>
				<Btn type="submit">Play as Guest</Btn>
			</LoginForm>
			<NewAccountContainer>
				<NewAccountMsg>Need an account?</NewAccountMsg>
				<Link
					to="/register"
					style={{
						textDecoration: 'none',
						color: 'rgb(141, 0, 0)',
						fontWeight: 700,
					}}
				>
					Sign up
				</Link>
			</NewAccountContainer>
			{errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
		</Container>
	);
};

export default LoginPage;
