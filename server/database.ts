const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'vietbigtwo',
	password: 'Snowboarding1',
});

export default pool;
