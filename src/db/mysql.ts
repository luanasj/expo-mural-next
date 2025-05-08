import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST, // Endereço do banco de dados
  user: process.env.DB_USER, // Usuário do banco
  password: process.env.DB_PASSWORD, // Senha
  database: process.env.DB_NAME, // Nome do banco
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;