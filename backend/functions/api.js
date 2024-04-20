import express from 'express';
import mysql from 'mysql';
import env from 'dotenv';
import serverless from 'serverless-http';
import cors from 'cors';

// Iniciar App y Router
const app = express();
const router = express.Router();

// Habilitar completamente las consultas
app.options('*', cors());

// Llamar las variables del .env
env.config()
const passwordbd = process.env.DB_PASSWORD;
const hostdb = process.env.DB_HOST;
const userdb = process.env.DB_USER;
const namedb = process.env.DB_NAME;
const portdb = process.env.DB_PORT;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: hostdb,
  user: userdb,
  password: passwordbd,
  database: namedb,
  port: portdb
});

// Establecer conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos de Azure MySQL');
});

// Ruta para obtener datos de personas con su apartment y housing_unit
router.get('/inhabitants/:apartment/:housing_unit', (req, res) => {

  // Conseguir parametros desde el link
  const apartment = req.params.apartment;
  const housing_unit = req.params.housing_unit;

  // Realizar Query
  const query = 'SELECT * FROM inhabitants WHERE apartment = ? AND housing_unit = ?;';

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, [apartment, housing_unit], (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al obtener datos desde la base de datos');
      return;
    }
    res.json(rows); // Enviar los datos como JSON al cliente
  });
});

// Ruta para obtener datos de personas
router.get('/inhabitants', (req, res) => {

  // Realizar Query
  const query = 'SELECT * FROM inhabitants;';

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al obtener datos desde la base de datos');
      return;
    }
    res.json(rows); // Enviar los datos como JSON al cliente
  });
});

// Ruta para agregar visitantes
// Link de ejemplo /add_visitor/Anuel/Brr/21123456/7/1999-09-09/null/Frequent
router.get('/add_visitor/:name/:last_name/:rut/:dv/:birthdate/:last_visit/:visit_type', (req, res) => {

  // Conseguir parametros desde el link
  const { name, last_name, rut, dv, birthdate, last_visit, visit_type } = req.params;

  // Realizar Query
  const query = `CALL add_visitor("${name}", "${last_name}", ${rut}, ${dv}, "${birthdate}", ${last_visit}, "${visit_type}")`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ err: 'Ocurrió un error al procesar la solicitud.' });
    } else {
      console.log('Se agregó el visitante correctamente.');
      res.status(200).json({ message: 'Se agregó el visitante correctamente.' });
    }
  });
});

// Ruta para obtener datos de personas
router.get('/visitors', (req, res) => {

  // Realizar Query
  const query = 'SELECT * FROM visitors_information;';

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al obtener datos desde la base de datos');
      return;
    }
    res.json(rows); // Enviar los datos como JSON al cliente
  });
});

// Ruta para eliminar visitante
router.get('/delete_visitor/:id', (req, res) => {

  // ID visitante a eliminar
  const visitorId = req.params.id;

  // Realizar Query
  const query = `DELETE FROM visitors WHERE visitors.id = ?;`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, [visitorId], (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al obtener datos desde la base de datos');
      return;
    }
  });
});

// Ruta para agregar vehiculos
// Link de ejemplo /add_vehicle/21123456/ABC123/5/1999-09-09
router.get('/add_vehicle/:rut/:license_plate/:parket_at/:parket_since', (req, res) => {

  // Conseguir parametros desde el link
  const { rut, license_plate, parket_at, parket_since} = req.params;

  // Realizar Query
  const query = `CALL search_visitor_run(${rut})`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ err: 'Ocurrió un error al procesar la solicitud.' });
    } else {
      // Conseguir id por RUT
      if (results[0].length > 0) {
        // Consegir id
        const visitorId = results[0][0].id;
        // Agregar vehiculo
        const query = `CALL add_visitor_vehicle(${visitorId}, "${license_plate}", "${parket_at}", "${parket_since}")`;
        connection.query(query, (error, results, fields) => {
          if (error) {
            console.error('Error al agregar el vehículo:', error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
          } else {
            res.status(200).json({ message: 'Se agregó el vehículo correctamente.' });
          }
        });
      console.log('Se agregó el visitante correctamente.');
      res.status(200).json({ message: 'Se agregó el visitante correctamente.' });
    }
    else {
      res.status(404).json({ error: 'No se encontró ningún visitante con el RUN proporcionado.' });
    }
  }
  });
});

// Ruta para obtener datos de vehiculos estacionados
router.get('/parked', (req, res) => {

  // Realizar Query
  const query = 'SELECT * FROM currently_parked_vehicles;';

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al obtener datos desde la base de datos');
      return;
    }
    res.json(rows); // Enviar los datos como JSON al cliente
  });
});

// Ruta para agregar correspondencia
router.get('/add_mail/:id/:type/:date/:claimed', (req, res) => {

  // Conseguir parametros desde el link
  const { id, type, date, claimed } = req.params;

  // Realizar Query
  const query = `CALL add_mail(${id}, "${type}", "${date}", ${claimed})`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ err: 'Ocurrió un error al procesar la solicitud.' });
    } else {
      console.log('Se agregó el visitante correctamente.');
      res.status(200).json({ message: 'Se agregó el visitante correctamente.' });
    }
  });
});

// Ruta para obtener datos de correspondencia sin reclamar
router.get('/unclaimed_correspondence', (req, res) => {

  // Realizar Query
  const query = 'SELECT * FROM unclaimed_correspondence;';

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
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
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);