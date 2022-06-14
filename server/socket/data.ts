const usersOnline: {
	[socketId: string]: string;
} = {};

interface UserListType {
	[seat: number]: { socketId: string; username: string } | null;
}

interface RoomType {
	users: UserListType;
	inGame: boolean;
	playerCards: { [seat: number]: string[] | null } | null;
	currentRound: { currentPlayer: number; playersSkipped: string[] } | null;
	password: string;
}

const gameRooms: {
	[room: string]: RoomType;
} = {};

const findSocketId = (name: string): string | null => {
	for (const [socketId, username] of Object.entries(usersOnline)) {
		if (username === name) {
			return socketId;
		}
	}
	return null;
};

interface RoomsListType {
	[room: string]: { userCount: number; inGame: boolean };
}

const countUsers = (usersList: UserListType): number => {
	let count = 0;
	for (const value of Object.values(usersList)) {
		if (value) {
			count += 1;
		}
	}
	return count;
};

const getRoomListData = (): RoomsListType => {
	const roomListData: RoomsListType = {};
	for (const [room, value] of Object.entries(gameRooms)) {
		roomListData[room] = {
			userCount: countUsers(value.users),
			inGame: value.inGame,
		};
	}
	return roomListData;
};

const firstEmptySeat = (userList: UserListType): number | string => {
	if (!userList) {
		return 1;
	}

	for (const [key, value] of Object.entries(userList)) {
		if (!value) {
			return key;
		}
	}
	return 'Sorry, room is now full.';
};

export {
	usersOnline,
	gameRooms,
	findSocketId,
	getRoomListData,
	firstEmptySeat,
};
