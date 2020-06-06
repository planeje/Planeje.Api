const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    //alterar senha
    connectionString: 'postgresql://postgres:123@localhost:5432/planeje_db'
});

pool.on('connect', () => {
    console.log('Base de dados conectado com sucesso!');
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}