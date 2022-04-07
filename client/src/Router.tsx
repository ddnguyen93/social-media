import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './routes/MainPage';
import RegisterPage from './routes/RegisterPage';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
