import { gameRooms, getRoomListData } from './data';
const bcryptjs = require('bcryptjs');

module.exports = (io: any, socket: any) => {
	socket.on('room-list', () => {
		io.to(socket.id).emit('refresh-room-list', getRoomListData());
	});

	socket.on('join-room', (user: string, room: string) => {});

	socket.on(
		'create-room',
		async (user: string, room: string, password: string) => {
			if (gameRooms[room]) {
				io.to(socket.id).emit('room-name-taken');
			} else {
				let hashedPassword = null;
				if (password) {
					hashedPassword = await bcryptjs.hash(password, 10);
				}
				gameRooms[room] = {
					users: {
						1: { socketId: socket.id, username: user },
						2: null,
						3: null,
						4: null,
					},
					inGame: false,
					playerCards: null,
					currentRound: null,
					password: hashedPassword,
				};
				io.emit('refresh-room-list', getRoomListData());
			}
		}
	);
};
