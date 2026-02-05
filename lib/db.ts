import mysql from 'mysql2/promise';

// Configuración directa con los datos que funcionaron en la cosecha
export const db = mysql.createPool({
  host: "gateway01.us-east-1.prod.aws.tidbcloud.com", //
  user: "iXqaGH5LjokAQBN.root",                      //
  password: "yKXU8NU0cRibwSWq",                      //
  database: "test",                                  //
  port: 4000,                                        //
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true // Esto es obligatorio para conectar desde la web a TiDB
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});