import pool from '../database';
import { Request, Response } from 'express';
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

exports.test = async function (req: Request, res: Response) {
	const response = await pool.query('SELECT * FROM users');
	console.log(response.rows);
	res.status(200).json({ message: 'request success' });
};

exports.user_create = async function (req: Request, res: Response) {
	try {
		const hashedPassword = await bcryptjs.hash(req.body.password, 10);

		await pool.query(
			`INSERT INTO users (username, email, password) VALUES ('${req.body.username}','${req.body.email}','${hashedPassword}')`
		);

		res.status(201).json({ message: 'User has been successfully created.' });
	} catch (err: any) {
		if (err.code === '23505') {
			const errorDetail = err.detail.split(' ')[1].split('=')[0];
			let keyError = errorDetail.slice(1, errorDetail.length - 1);

			keyError = keyError.charAt(0).toUpperCase() + keyError.slice(1);

			res.status(500).json({
				error: `${keyError} has been taken.`,
			});
		} else {
			res.status(400).json({
				error: 'Error occured.',
			});
		}
	}
};

exports.user_login = async function (req: Request, res: Response) {
	try {
		const query = await pool.query(
			`SELECT * FROM users WHERE email = '${req.body.email}'`
		);

		if (query.rows.length == 1) {
			const passwordValid = await bcryptjs.compare(
				req.body.password,
				query.rows[0].password
			);

			if (passwordValid) {
				const JWTtoken = jwt.sign(
					{ userId: query.rows[0].user_id },
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: '24h' }
				);
				res.status(200).json({
					token: JWTtoken,
					username: query.rows[0].username,
					userId: query.rows[0].user_id,
				});
			} else {
				res.status(401).json({
					error: 'Invalid password. Please double check and try again.',
				});
			}
		} else {
			res.status(401).json({
				error:
					'The email you enter does not exist. Please double check and try again.',
			});
		}
	} catch (err: any) {
		console.log(err);
		res.status(400).json({
			error: 'Error occured.',
		});
	}
};
