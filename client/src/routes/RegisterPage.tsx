import { FunctionComponent, useRef, useState, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	height: 350px;
	max-width: 90%;
`;

const PageTitle = styled.h1`
	color: white;
	margin: 0px;
`;

const SignUpForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 10px;
	font-size: 1rem;
`;

const InputLabel = styled.label`
	color: white;
	margin: 10px 0px 5px 0px;
`;

const Input = styled.input`
	background-color: transparent;
	border-width: 0px 0px 2px 0px;
	color: #ffffff;
	outline: none;
	font-size: 1rem;
`;

const RegisterBtn = styled.button`
	margin-top: 15px;
	font-size: 1.2rem;
	background-color: rgb(104, 0, 0);
	border-radius: 5px;
	padding: 5px;
	border: none;
	color: white;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 1);
	transition: all 0.2s ease 0s;

	&:hover {
		cursor: pointer;
	}

	&:active {
		transform: translateY(3px);
	}
`;

const ExistingAcc = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ExAccMessage = styled.p`
	margin: 5px;
`;

const ErrorContainer = styled.div`
	color: #860000;
	padding: 5px;
	font-weight: 600;
`;

const RegisterPage: FunctionComponent = () => {
	const username = useRef<HTMLInputElement | null>(null);
	const email = useRef<HTMLInputElement | null>(null);
	const password = useRef<HTMLInputElement | null>(null);
	const [notification, setNotification] = useState<string>('');
	const [redirectLogin, setRedirectLogin] = useState<Boolean>(false);

	const registerHandler = async (event: FormEvent<EventTarget>) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/api/user/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username.current!.value,
					email: email.current!.value,
					password: password.current!.value,
				}),
			});
			const responseData = await response.json();
			console.log(responseData);
			if (responseData.error) {
				setNotification(responseData.error);
			}
			if (responseData.message === 'User has been successfully created.') {
				setNotification(responseData.message);

				setTimeout(() => setRedirectLogin(true), 3000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			{redirectLogin && <Navigate replace to="/login" />}
			<PageTitle>Sign Up</PageTitle>
			<SignUpForm onSubmit={registerHandler}>
				<InputLabel>Username</InputLabel>
				<Input ref={username} type="text" required />
				<InputLabel>Email</InputLabel>
				<Input ref={email} type="email" required />
				<InputLabel>Password</InputLabel>
				<Input ref={password} type="password" required />
				<RegisterBtn type="submit">Sign Up</RegisterBtn>
			</SignUpForm>
			<ExistingAcc>
				<ExAccMessage>Have an account?</ExAccMessage>
				<Link
					to="/login"
					style={{
						textDecoration: 'none',
						color: 'rgb(141, 0, 0)',
						fontWeight: 700,
					}}
				>
					Sign in
				</Link>
			</ExistingAcc>
			<ErrorContainer>{notification}</ErrorContainer>
		</Container>
	);
};

export default RegisterPage;
