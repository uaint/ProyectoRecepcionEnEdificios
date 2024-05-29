import express from 'express';
import mysql from 'mysql';
import env from 'dotenv';
import serverless from 'serverless-http';
import jwt from 'jsonwebtoken';

// Start app & router with Express
const app = express();
const router = express.Router();

// Call all the vars in .env
env.config()
const passwordbd = process.env.DB_PASSWORD;
const hostdb = process.env.DB_HOST;
const userdb = process.env.DB_USER;
const namedb = process.env.DB_NAME;
const portdb = process.env.DB_PORT;
const timezonedb = process.env.DB_TIMEZONE;

// DB connection configuration
/*
const connection = mysql.createConnection({
  host: hostdb,
  user: userdb,
  password: passwordbd,
  database: namedb,
  port: portdb,
  timezone: timezonedb,
}); 
*/

// Create a connection pool
const connection = mysql.createPool({
  connectionLimit: 10, // Adjust based on your needs
  host: hostdb,
  user: userdb,
  password: passwordbd,
  database: namedb,
  port: portdb,
  timezone: timezonedb,
  connectTimeout: 10000, // 10 seconds
  acquireTimeout: 10000 // 10 seconds
});

// Establish a connection with the database
/*
connection.connect((err) => {

  // No connection was established
  if (err) {
    console.error('An error occurred when attempting to connect to the database:', err);
    return;
  }
  
  // Connection successful
  else {
    console.log('Successful connection made to the database hosted in the Azure MySQL Flexible Server instance.');
    return;
  }
});
*/

// Middleware for CORS
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Route to obtain people data (apartment & housing_unit)
// Example: /inhabitants/1/101
router.get('/inhabitants/:tower_id/:number_identifier', (req, res) => {

  // Fetch the parameters from the previous link
  const { tower_id, number_identifier} = req.params;

  // Create the query
  const query = `CALL obtain_inhabitants_by_apartment(?, ?);`;

  // Execute the query (call to the database)
  connection.query(query, [tower_id, number_identifier], (err, rows) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).send('There was an error trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows[0]); // Send the data obtained as .json to the client
      return;
    }
  });
});

// Route: Obtain data from all the inhabitants of the building
router.get('/inhabitants', (req, res) => {

  // Create the query
  const query = 'SELECT * FROM inhabitant;';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).send('There was an error trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send the data obtained as .json to the client
      return;
    }
  });
});

// Route: Add visitors
// Example: /add_visitor/Anuel/Brr/21123456/7/1999-09-09/1/101/1
router.get('/add_visitor/:name/:last_name/:rut/:dv/:birthdate/:tower/:apartment/:visit_type', (req, res) => {

  // Fetch the parameters from the previous link
  const { name, last_name, rut, dv, birthdate, tower, apartment, visit_type } = req.params;

  // Create the query using the check_and_add_non_frequent_visitor stored procedure
  const query = `CALL check_and_add_non_frequent_visitor(?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [name, last_name, rut, dv, birthdate, tower, apartment, visit_type], (err, results, fields) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).send('There was an error trying to send data to the database.');
      return;
    } 
    // Query success
    else {
      console.log('The visitor was added successfully to the database.');
      res.status(200).json({ message: 'The visitor was added successfully to the database.' });
      return;
    }
  });
});

// Route: Fetch data from visitors
router.get('/visitors', (req, res) => {

  // Create the query using the visitors_information view
  const query = 'SELECT * FROM visitors_information;';

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).send('There was an error trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .JSON to the client
      return;
    }
  });
});

// Route: Delete visit
// Example: /delete_visit/1
router.get('/delete_visit/:visit_id_log', (req, res) => {

  // Fetch the ID of the visitor that's going to be deleted
  const visit_id_log = req.params.visit_id_log;

  // Create the query
  const query = `DELETE FROM visitor_log WHERE id = ?;`;

  connection.query(query, [visit_id_log], (err, rows) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).send('There was an error trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'The visit log has been deleted succesfully.'});
      return;
    }
  });
});

// Route: Delete visitor
// Example: /delete_visitor/1
router.get('/delete_visitor/:id', (req, res) => {

  // Fetch the ID of the visitor that's going to be deleted
  const visitorId = req.params.id;

  // Create the query
  const query = `DELETE FROM vehicle_visitors WHERE visitor_id = ?;`;

  // Execute the query (call to the database to first delete associated vehicles to the visitor ID, and then the visitor)
  connection.query(query, [visitorId], (err, rows) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      console.log(err);
      res.status(500).send('There was an error trying to manipulate data from the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Vehicle(s) deleted successfully.'});

      // Create and execute the query to finally delete the visitor
      const query = `DELETE FROM visitor WHERE id = ?;`;
      connection.query(query, [visitorId], (err, rows) => {
        // Query failed
        if (err) {
          console.error('There was an error executing the query:', err);
          console.log(err);
          res.status(500).send('There was an error trying to manipulate data from the database.');
          return;
        }
        // Query success
        else {
          res.status(200).json({ message: 'The data from this visitor has been deleted succesfully.'});
          return;
        }
      });
    }
  });
});

// Route: Assing Parking
// Example: /add_vehicle/ABC123/5
router.get('/assing_parking/:license_plate/:parket_at/', (req, res) => {
  // Fetch license plate
  const { license_plate, parket_at } = req.params;

  // Create query with the delete_vehicle stored procedure
  const query = `CALL assign_parking_spot (?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [license_plate, parket_at], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to manipulate data from the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Vehicle deleted successfully.'});
      return;
    }
  });
});

// Route: Parked vehicles
router.get('/parked', (req, res) => {

  // Create query with the currently_parked_vehicles view
  const query = 'SELECT * FROM currently_parked_vehicles;';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: vehicles
router.get('/vehicles', (req, res) => {

  // Create query with the mail table
  const query = 'SELECT * FROM all_vehicles;';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Delete vehicle
router.get('/free_parking/:plate', (req, res) => {

  // Fetch license plate
  const plate = req.params.plate;

  // Create query with the delete_vehicle stored procedure
  const query = `CALL free_parking_spot(?)`;

  // Execute the query (call to the database)
  connection.query(query, [plate], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to manipulate data from the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Vehicle deleted successfully.'});
      return;
    }
  });
});

// Route: Add vehicle
// Example: /add_vehicle/
router.get('/add_vehicle/:rut/:license_plate', (req, res) => {

  // Fetch the parameters from the previous link
  const { rut, license_plate } = req.params;

  // Create query for searching the visitor's RUN with the help of add_visitor_vehicle stored procedure
  const query = `CALL add_visitor_vehicle(obtain_visitor_id_by_run(?), ?)`;

  // Execute the query (call to the database)
  connection.query(query, [rut, license_plate], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to manipulate data from the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Vehicle added successfully.'});
      return;
    }
  });
});

// Route: Delete vehicle
// Example: /delete_vehicle/ABC123
router.get('/delete_vehicle/:plate', (req, res) => {

  // Fetch license plate
  const plate = req.params.plate;

  // Create query with the delete_vehicle stored procedure
  const query = `CALL delete_vehicle(?)`;

  // Execute the query (call to the database)
  connection.query(query, [plate], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to manipulate data from the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Vehicle deleted successfully.'});
      return;
    }
  });
});

// Route: Add correspondence
// Example: /add_mail/101/1/Letters//:i_notified
router.get('/add_mail/:apt_recipient/:hu_recipient/:m_type/:a_time/:i_notified', (req, res) => {

  // Fetch the parameters from the previous link
  const { apt_recipient, hu_recipient, m_type, a_time, i_notified } = req.params;

  // Create the query with the add_mail stored procedure
  const query = `CALL add_mail(?, ?, ?, ?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [m_type, a_time, apt_recipient, hu_recipient, i_notified], (err, results, fields) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).json({ err: 'An error occurred when trying to manipulate data onto the database.' });
      return;
    }
    // Query success
    else {
      console.log('Correspondence added succesfully.');
      res.status(200).json({ message: 'Correspondence added succesfully.' });
      return;
    }
  });
});

// Route: Unclaimed Correspondence
router.get('/unclaimed_correspondence', (req, res) => {

  // Create query with the unclaimed_correspondence view
  const query = 'SELECT * FROM unclaimed_correspondence;';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Correspondence
router.get('/correspondence', (req, res) => {

  // Create query with the mail table
  const query = 'SELECT * FROM all_correspondence;';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to fetch data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Mark correspondence as claimed 
router.get('/is_claimed/:id', (req, res) => {

  // Fetch parameters from the previous link
  const {id} = req.params;

  // Create the query calling the update_mail_to_claimed stored procedure
  const query = `CALL update_mail_to_claimed(?)`;

  // Execute the query (call to the database)
  connection.query(query, [id], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred when trying to update the data from the database.');
      return;
    }
    // Verify if update was successful
    if (res.affectedRows === 0) {
      res.status(404).send(`No correspondence found`);
      return;
    } else {
      // Send a success response
      res.status(200).send(`Correspondence marked as claimed.`);
      return;
    }
  });
});

// Route: Mark correspondence as claimed 
router.get('/frequent_visit/:run', (req, res) => {

  // Fetch parameters from the previous link
  const {run} = req.params;

  // Create the query calling the update_mail_to_claimed stored procedure
  const query = `CALL check_and_add_visitor(?)`;

  // Execute the query (call to the database)
  connection.query(query, [run], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred when trying to update the data from the database.');
      return;
    }

    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Login
router.get('/login/:username', (req, res) => {
  // Fetch the username
  const username = req.params.username;

  // Create the query to verify if the username is valid & fetch the data associated
  const query = 'SELECT * FROM login_sys WHERE username = ?';

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute query (call to the database)
  connection.query(query, [username], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred when trying to execute the query:', err);
      res.status(500).send('An error occurred when trying to authenticate the user.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
    }
  );
});

// Route: Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Example: Delete cookie 'token'
  res.status(200).send('You have logged out successfully.');
});


// Route: Retrieve token
router.get('/token/:username', (req, res) => {

  // Fetch username and password
  const username = req.params.username;

  // Create and sign token
  const token = jwt.sign({username}, "Stack", {
    expiresIn: '1h' // Expires after...
  });

  // Send token (HttpOnly for extra security)
  res.cookie('token', token, { httpOnly: true });
  res.send({token});
});

// Start the server
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);