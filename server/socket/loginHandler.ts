import pool from '../database';
import { usersOnline, findSocketId } from './data';

module.exports = (io: any, socket: any) => {
	socket.on('temp-user-login', async (username: string): Promise<void> => {
		const query = await pool.query(
			`SELECT * FROM users WHERE username = '${username}'`
		);
		if (query.rows.length == 0 && !findSocketId(username)) {
			usersOnline[socket.id] = username;
			io.to(socket.id).emit('username-available', username);
		} else {
			io.to(socket.id).emit(
				'username-taken',
				'Username has been taken. Please choose another one.'
			);
		}
	});

	socket.on('user-login', (username: string): void => {
		usersOnline[socket.id] = username;
	});

	socket.on('sign-out', () => {
		delete usersOnline[socket.id];
	});
};
