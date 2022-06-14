import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import MainPage from './routes/MainPage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import { AuthContext } from './contexts/AuthContext';
import { SocketContext } from './contexts/socket';
import { LobbyProvider } from './contexts/LobbyContext';

const Router = () => {
	const { userData, setUserData } = useContext(AuthContext)!;
	const { socket } = useContext(SocketContext)!;
	const [showPage, setShowPage] = useState<boolean>(false);

	const relogin = async () => {
		const userValue = localStorage.getItem('userData');

		if (userValue === null) {
			setShowPage(true);
			return;
		}

		const localUserData = JSON.parse(userValue);

		try {
			const response = await fetch('http://localhost:5000/api/user/relogin', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localUserData.JWT}`,
				},
			});
			const responseData = await response.json();
			console.log(responseData);

			if (responseData.error === 'Authentication Failed.') {
				setUserData(null);
				window.localStorage.removeItem('userData');
			} else {
				const data = {
					username: responseData.username,
					tempUser: false,
					userId: responseData.userID,
					JWT: localUserData.JWT,
				};
				socket.emit('user-login', responseData.username);
				localStorage.setItem('userData', JSON.stringify(data));
				setUserData(data);
			}
			setShowPage(true);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		relogin();
	}, []);

	return (
		<>
			{showPage ? (
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<LobbyProvider>
									<MainPage />
								</LobbyProvider>
							}
						/>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</BrowserRouter>
			) : (
				<div></div>
			)}
		</>
	);
};

export default Router;
