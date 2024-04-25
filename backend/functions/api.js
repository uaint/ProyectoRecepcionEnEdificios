import express from 'express';
import mysql from 'mysql';
import env from 'dotenv';
import serverless from 'serverless-http';
import cors from 'cors';
import jwt from 'jsonwebtoken';

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
const timezonedb = process.env.DB_TIMEZONE;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: hostdb,
  user: userdb,
  password: passwordbd,
  database: namedb,
  port: portdb,
  timezone: timezonedb,
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
// Link de ejemplo /inhabitants/1/101
router.get('/inhabitants/:apartment/:housing_unit', (req, res) => {

  // Conseguir parametros desde el link
  const apartment = req.params.apartment;
  const housing_unit = req.params.housing_unit;

  // Realizar Query
  const query = 'SELECT * FROM inhabitants WHERE apartment = ? AND housing_unit = ?;';

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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
// Link de ejemplo /add_visitor/Anuel/Brr/21123456/7/1999-09-09/null/1/101/Frequent
router.get('/add_visitor/:name/:last_name/:rut/:dv/:birthdate/:apartment/:housing_unit/:visit_type', (req, res) => {

  // Conseguir parametros desde el link
  const { name, last_name, rut, dv, birthdate, apartment, housing_unit, visit_type } = req.params;

  // Realizar Query
  const query = `CALL add_visitor("${name}", "${last_name}", ${rut}, ${dv}, "${birthdate}", NOW(), "${apartment}", "${housing_unit}", "${visit_type}")`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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
// Link de ejemplo /delete_visitor/1
router.get('/delete_visitor/:id', (req, res) => {

  // ID visitante a eliminar
  const visitorId = req.params.id;

  // Realizar Query
  const query = `DELETE FROM vehicles_visitors WHERE visitor_id = ?;`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD para eliminar vehiculos asociados
  connection.query(query, [visitorId], (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      console.log(err);
      res.status(500).send('Error al obtener datos desde la base de datos');
      return;
    }
    else {
      res.status(200).json({ message: 'Se elimino el vehículo correctamente.'});
      // Hacer llamado a la BBDD para eliminar finalmente el visitante
      const query = `DELETE FROM visitors WHERE id = ?;`;
      connection.query(query, [visitorId], (err, rows) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err);
          console.log(err);
          res.status(500).send('Error al obtener datos desde la base de datos');
          return;
        }
        else {
          res.status(200).json({ message: 'Se elimino el visitante correctamente.'});
        }
      });
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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

// Ruta para eliminar vehiculo
router.get('/delete_vehicle/:plate', (req, res) => {

  // Conseguir patente
  const plate = req.params.plate;

  // Realizar Query
  const query = `CALL delete_vehicle("${plate}")`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    else {
      res.status(200).json({ message: 'Se elimino el vehiculo correctamente.'});
    }
  });
});

// Ruta para agregar correspondencia
// Link ejemplo: /add_mail/101/1/Letters//:i_notified
router.get('/add_mail/:apt_recipient/:hu_recipient/:m_type/:a_time/:i_notified', (req, res) => {

  // Conseguir parametros desde el link
  const { apt_recipient, hu_recipient, m_type, a_time, i_notified } = req.params;

  // Realizar Query
  const query = `CALL add_mail(${apt_recipient}, ${hu_recipient}, "${m_type}", "${a_time}", ${i_notified})`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
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

// Ruta para marcar correspondencia como reclamada 
router.get('/is_claimed/:id', (req, res) => {

  // Conseguir parametros desde el link
  const {id} = req.params;

  // Realizar Query
  const query = `CALL update_mail_to_claimed(${id})`;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, [id], (err, rows) => {
    if (err) {
      res.status(500).send('Error al actualizar los datos en la base de datos');
      return;
    }
    // Verificar si se actualizó correctamente
    if (res.affectedRows === 0) {
      res.status(404).send(`No se encontró la correspondencia con el ID ${id}`);
      return;
    }
    // Envía una respuesta exitosa
    res.status(200).send(`Se marcó la correspondencia con el ID ${id} como reclamada`);
  });
});

// Ruta para el login
router.get('/login/:username', (req, res) => {
  // Obtener username
  const username = req.params.username;

  // Realizar la consulta para verificar si el usuario es valido y conseguir los datos
  const query = 'SELECT * FROM login_system WHERE username = ?';

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Hacer llamado a la BBDD
  connection.query(query, username, (err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error al autenticar al usuario');
      return;
    }
    res.json(rows); // Enviar los datos como JSON al cliente
    }
  );
});

// Ruta para conseguir el token
router.get('/token/:username', (req, res) => {

  // Obtener username y password
  const username = req.params.username;

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Crear y firmar token
  const token = jwt.sign({username}, "Stack", {
    expiresIn: '5m' // Tiempo de expiracion
  });

  // Enviar token 
  res.send({token});

});

// Iniciar el servidor
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);