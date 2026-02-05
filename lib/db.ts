import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: "gateway01.us-east-1.prod.aws.tidbcloud.com",
  user: "iXqaGH5LjokAQBN.root",
  password: "yKXU8NU0cRibwSWq",
  database: "test",
  port: 4000,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false // Cambiamos a false para evitar bloqueos estrictos de certificados en Netlify
  },
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000 // 10 segundos de espera
});