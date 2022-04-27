import { useEffect, useState } from 'react';
import { createContext, FunctionComponent, useContext } from 'react';
import { SocketContext } from './socket';

type Props = {
	userData: any;
	setUserData: Function;
};

export const AuthContext = createContext<Props | null>(null);

export const AuthProvider: FunctionComponent = ({ children }) => {
	const [userData, setUserData] = useState<any | null>(null);
	const { socket } = useContext(SocketContext)!;

	useEffect(() => {
		const userValue = localStorage.getItem('userData');
		const localUserData = JSON.parse(userValue!);

		if (localUserData != null) {
			setUserData(localUserData);
			socket.emit('user-login', localUserData.username);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ userData, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};
