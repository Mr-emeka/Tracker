import {
  Pool
} from 'pg';
import {
  parse
} from 'pg-connection-string';
import dotenv from 'dotenv';
dotenv.config();

const connectString = {
  user: process.env.DEV_USERNAME,
  host: process.env.DEV_HOST,
  port: process.env.DEV_PORT,
  database: process.env.DEV_DB,
  password: process.env.DEV_PASSWORD
};

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = parse(process.env.DB_URL);

// console.log(connectionString)
let pool;
if (isProduction) {
  pool = new Pool(connectionString);
  console.log('production connected')
} else {
  pool = new Pool(connectString);
  console.log('development connected')
}
pool.connect();

/**
 *Create  Request Table
 */
const createRequestsTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS requests(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL,
    description VARCHAR(255) NOT NULL,
    user_id int NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
)`;
  try {
    await pool.query(queryText);
    console.log("Requests Table created");
  } catch (e) {
    console.log(e);
    pool.end();
  }
}
/** 
 * Create user Table
 */
const createUsersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL NOT NULL PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  admin BOOLEAN NOT NULL DEFAULT FALSE,
  password VARCHAR(128) NOT NULL,
  created_date TIMESTAMP NOT NULL DEFAULT NOW(),
  modified_date TIMESTAMP NOT NULL DEFAULT NOW()
  )`;
  try {
    await pool.query(queryText);
    console.log("Users Table created");
  } catch (e) {
    console.log(e);
    pool.end();
  }
}
/**
 * Drop Request Table
 */

const dropRequestsTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS requests';
  try {
    await pool.query(queryText);
    console.log("Table dropped");
  } catch (e) {
    console.log(e);
    pool.end();
  }
}
/**
 * Drop users Table
 */
const dropUsersTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS users CASCADE';
  try {
    await pool.query(queryText);
    console.log("Table dropped");
  } catch (e) {
    console.log(e);
    pool.end();
  }
}
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUsersTable();
  createRequestsTable();
}
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropRequestsTable();
  dropUsersTable();
}

createAllTables();
// dropAllTables();


// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });


export default pool;