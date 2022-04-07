import { FunctionComponent } from 'react';
import './App.css';
import { SocketProvider } from './contexts/socket';
import Router from './Router';

const App: FunctionComponent = () => {
	return (
		<SocketProvider>
			<div className="App">
				<Router />
			</div>
		</SocketProvider>
	);
};

export default App;
