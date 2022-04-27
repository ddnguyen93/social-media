import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './routes/MainPage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
