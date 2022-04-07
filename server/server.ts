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

app.use(function (req: { testing: string }, res: any, next: () => any) {
	console.log('middleware');
	req.testing = 'testing';
	return next();
});

app.get(
	'/',
	function (req: { testing: any }, res: { end: () => void }, next: any) {
		console.log('get route', req.testing);
		res.end();
	}
);

io.on('connection', (socket: any) => {
	console.log('a user connected');

	socket.on('message', (msg: any) => {
		console.log(msg);
	});
});

server.listen(5000, () => {
	console.log('Server started');
});
