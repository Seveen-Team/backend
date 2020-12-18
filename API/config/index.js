const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	app: {
		port: process.env.PORT || 8000,
		env: process.env.NODE_ENV,
	},
	database: {
		dbName: process.env.DB_NAME,
		dbUser: process.env.DB_USER,
		dbPassword: process.env.DB_PASSWORD,
		dbPort: process.env.DB_PORT,
		dbHost: process.env.DB_HOST,
	},
	auth: {
		secret: process.env.AUTH_JWT_SECRET,
		username: process.env.AUTH_ADMIN_USERNAME,
		password: process.env.AUTH_ADMIN_PASSWORD,
		email: process.env.AUTH_ADMIN_EMAIL,
	},
};
