import { FunctionComponent } from 'react';
import { SocketProvider } from './contexts/socket';
import { AuthProvider } from './contexts/AuthContext';
import Router from './Router';
import styled from 'styled-components';

const Container = styled.div`
	background: linear-gradient(to bottom right, #4d011a 0%, #000000 100%);
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const App: FunctionComponent = () => {
	return (
		<SocketProvider>
			<AuthProvider>
				<Container className="App">
					<Router />
				</Container>
			</AuthProvider>
		</SocketProvider>
	);
};

export default App;
