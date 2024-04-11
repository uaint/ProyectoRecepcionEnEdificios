const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'rg-mysql-azure.mysql.database.azure.com',
  user: 'rgAzAdmin',
  password: 'password',
  database: 'roentgenium',
  port: 3306
});

// Establecer conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos de Azure MySQL');
});

// Ruta para obtener datos desde la base de datos
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM inhabitants';

  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al obtener datos desde la base de datos');
      return;
    }
    res.json(rows); // Enviar los datos como JSON al cliente
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
