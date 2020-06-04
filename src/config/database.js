const { Pool, Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: 'postgresql://postgres:admin@localhost:5432/planeje_db'
});

pool.on('connect', () => {
    console.log('Base de dados conectado com sucesso!');
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}