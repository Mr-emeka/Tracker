import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    user: process.env.DEV_USERNAME,
    port: process.env.DEV_PORT,
    host: process.env.DEV_HOST,
    database: process.env.DEV_DB,
    password: process.env.DEV_PASSWORD,
    // dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.TEST_HOST,
    // dialect: 'postgres',
    // logging: false,
  },
  production: {
    user: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    host: process.env.PROD_HOST,
    database: process.env.PROD_DB,
    port: process.env.PROD_PORT,
    max: 10,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 3000,
  }
  // ,
  //   development: {
  //   use_env_variable: 'DATABASE_URL_DEV',
  //   dialect: 'postgres',
  //  }
};