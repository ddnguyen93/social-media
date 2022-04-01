import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.json({ message: 'Get request successful' });
});

app.listen(5000, () => {
	console.log('Server started');
});
