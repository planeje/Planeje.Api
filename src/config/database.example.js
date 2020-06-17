const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    //alterar senha
    connectionString: 'postgres://lphhwxifkkelbx:f6f9b507c97e9d1a3c02e8e38b1cb987137958ad8ed603c7f14f0194fbb6afab@ec2-34-197-141-7.compute-1.amazonaws.com:5432/d62ihk396ssu2s',
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
    console.log('Base de dados conectado com sucesso!');
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}