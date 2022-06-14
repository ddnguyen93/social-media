import { useState } from 'react';
import { createContext, FunctionComponent } from 'react';

type Props = {
	inLobby: boolean;
	setInLobby: Function;
	roomClicked: string | null;
	setRoomClicked: Function;
};

export const LobbyContext = createContext<Props | null>(null);

export const LobbyProvider: FunctionComponent = ({ children }) => {
	const [inLobby, setInLobby] = useState<boolean>(true);

	const [roomClicked, setRoomClicked] = useState<string | null>(null);

	return (
		<LobbyContext.Provider
			value={{ inLobby, setInLobby, roomClicked, setRoomClicked }}
		>
			{children}
		</LobbyContext.Provider>
	);
};
