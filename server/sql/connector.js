import knex from 'knex';
// import knexfile from '../Knexfile.js';
const knexfile = {
    development: {
      client: 'mysql2',
      debug: false,
      connection: {
        host: '192.168.41.147',
        port: '3306',
        user: 'root',
        password: 'Ctmd1314',
        database: 'laboratory',
      },
    },
    production: {
      client: 'mysql2',
      debug: false,
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
      },
    },
  };

export default knex(knexfile[process.env.NODE_ENV || 'development']);