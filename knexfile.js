require('dotenv').config({ 
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' 
  });
  require('ts-node/register');
  
  module.exports = {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './src/database/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/database/seeds',
      extension: 'ts',
    },
    pool: {
      min: 1,
      max: 5,
    },
    acquireConnectionTimeout: 60000,
  };
  
// require('dotenv').config(); // Load environment variables

// module.exports = {
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
//   },
//   migrations: {
//     directory: './src/database/migrations',
//     extension: 'ts',
//     loadExtensions: ['.ts'],
//   },
//   seeds: {
//     directory: './src/database/seeds',
//     extension: 'ts',
//     loadExtensions: ['.ts'],
//   },
//   pool: {
//     min: 1,
//     max: 5,
//   },
//   acquireConnectionTimeout: 60000,
// };