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

	return (
		<AuthContext.Provider value={{ userData, setUserData }}>
			{children}
		</AuthContext.Provider>
	);
};
