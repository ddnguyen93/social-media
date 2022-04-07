import { io, Socket } from 'socket.io-client';
import { createContext, FunctionComponent } from 'react';

type Props = {
	socket: Socket;
};

export const SocketContext = createContext<Props | null>(null);

export const SocketProvider: FunctionComponent = ({ children }) => {
	const socket = io('http://localhost:5000/');
	socket.on('connect', () => {
		console.log(`connected to server ${socket.id}`);
	});

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
