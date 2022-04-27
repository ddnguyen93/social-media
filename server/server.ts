import { Request, Response, NextFunction } from 'express';
import pool from './database';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

const indexRouter = require('./routes/index');

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, PUT'
	);
	next();
});

app.use('/api/', indexRouter);

const usersOnline: {
	[username: string]: { temp_user: boolean; socketId: string };
} = {};

io.on('connection', (socket: any) => {
	console.log('a user connected', socket.id);

	socket.on('message', (msg: any) => {
		console.log(msg);
	});

	socket.on('temp-user-login', async (username: string) => {
		const query = await pool.query(
			`SELECT * FROM users WHERE username = '${username}'`
		);
		if (query.rows.length == 0 && !usersOnline[username]) {
			usersOnline[username] = { temp_user: true, socketId: socket.id };
			io.to(socket.id).emit('username-available');
		} else {
			io.to(socket.id).emit(
				'username-taken',
				'Username has been taken. Please choose another one.'
			);
		}
	});

	socket.on('user-login', (username: string) => {
		usersOnline[username] = { temp_user: false, socketId: socket.id };
	});

	socket.on('disconnect', () => {
		console.log('Disconnect', socket.id);
		for (const key in usersOnline) {
			if (usersOnline[key].socketId === socket.id) {
				delete usersOnline[key];
			}
		}
		console.log(usersOnline);
	});

	socket.on('show-users', () => {
		console.log(usersOnline);
	});
});

server.listen(5000, () => {
	console.log('Server started');
});
