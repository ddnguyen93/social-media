import { Request, Response, NextFunction } from 'express';
import pool from './database';
import { usersOnline, gameRooms } from './socket/data';
const loginHandler = require('./socket/loginHandler');
const roomHandler = require('./socket/roomHandler');

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

io.on('connection', (socket: any) => {
	loginHandler(io, socket);
	roomHandler(io, socket);

	socket.on('message', (msg: any) => {
		console.log(msg);
	});

	socket.on('disconnect', () => {
		delete usersOnline[socket.id];
	});
});

server.listen(5000, () => {
	console.log('Server started');
});
