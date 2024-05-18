import express from 'express';
import mysql from 'mysql';
import env from 'dotenv';
import serverless from 'serverless-http';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Start app & router with Express
const app = express();
const router = express.Router();

// Enable all CORS queries
app.options('*', cors());

// Call all the vars in .env
env.config()
const passwordbd = process.env.DB_PASSWORD;
const hostdb = process.env.DB_HOST;
const userdb = process.env.DB_USER;
const namedb = process.env.DB_NAME;
const portdb = process.env.DB_PORT;
const timezonedb = process.env.DB_TIMEZONE;

// DB connection configuration
const connection = mysql.createConnection({
  host: hostdb,
  user: userdb,
  password: passwordbd,
  database: namedb,
  port: portdb,
  timezone: timezonedb,
});

// Establish a connection with the database
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

// Route to obtain people data (apartment & housing_unit)
// Example: /inhabitants/1/101
router.get('/inhabitants/:apartment/:housing_unit', (req, res) => {

  // Fetch the parameters from the previous link
  const apartment = req.params.apartment;
  const housing_unit = req.params.housing_unit;

  // Create the query
  const query = 'SELECT * FROM inhabitants WHERE apartment = ? AND housing_unit = ?;';

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute the query (call to the database)
  connection.query(query, [apartment, housing_unit], (err, rows) => {
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

// Route: Obtain data from all the inhabitants of the building
router.get('/inhabitants', (req, res) => {

  // Create the query
  const query = 'SELECT * FROM inhabitants;';

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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
// Example: /add_visitor/Anuel/Brr/21123456/7/1999-09-09/null/1/101/Frequent
router.get('/add_visitor/:name/:last_name/:rut/:dv/:birthdate/:apartment/:housing_unit/:visit_type', (req, res) => {

  // Fetch the parameters from the previous link
  const { name, last_name, rut, dv, birthdate, apartment, housing_unit, visit_type } = req.params;

  // Create the query using the add_visitor stored procedure
  const query = `CALL add_visitor("${name}", "${last_name}", ${rut}, ${dv}, "${birthdate}", NOW(), "${apartment}", "${housing_unit}", "${visit_type}")`;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute the query (call to the database)
  connection.query(query, (err, results, fields) => {
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

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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

// Route: Delete visitor
// Example: /delete_visitor/1
router.get('/delete_visitor/:id', (req, res) => {

  // Fetch the ID of the visitor that's going to be deleted
  const visitorId = req.params.id;

  // Create the query
  const query = `DELETE FROM vehicles_visitors WHERE visitor_id = ?;`;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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
      const query = `DELETE FROM visitors WHERE id = ?;`;
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
  const license_plate = req.params.license_plate;
  const parket_at = req.params.parket_at;

  // Create query with the delete_vehicle stored procedure
  const query = `CALL assign_parking_spot ("${license_plate}", ${parket_at})`;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
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

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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
  const query = `CALL free_parking_spot("${plate}")`;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
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
// Example: /add_vehicle/21123456/ABC123/5/1999-09-09
router.get('/add_vehicle/:rut/:license_plate/:parket_at/:parket_since', (req, res) => {

  // Fetch the parameters from the previous link
  const { rut, license_plate, parket_at, parket_since} = req.params;

  // Create query for searching the visitor's RUN with the help of search_visitor_run stored procedure
  const query = `CALL search_visitor_run(${rut})`;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute the query (call to the database)
  connection.query(query, (err, results, fields) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).json({ err: 'An error occurred when trying to process the request.' });
      return;
    }
    // Query success (Visitor exists)
    else {
      if (results[0].length > 0) {
        // Fetch visitor's ID
        const visitorId = results[0][0].id;
        // Add the vehicle with the add_visitor_vehicle stored procedure
        const query = `CALL add_visitor_vehicle(${visitorId}, "${license_plate}", "${parket_at}", "${parket_since}")`;
        connection.query(query, (error, results, fields) => {
          // Query failed
          if (error) {
            console.error('An error occurred when adding the vehicle:', error);
            res.status(500).json({ error: 'An error occured when trying to process the request.' });
            return;
          }
          // Query success
          else {
            res.status(200).json({ message: 'Vehicle added successfully.' });
            return;
          }
        });
      console.log('Visitor added successfully.');
      res.status(200).json({ message: 'Visitor added successfully.' });
      return;
    }
    else {
      res.status(404).json({ error: 'Error: No visitor found with the provided RUN.' });
      return;
    }
  }
  });
});

// Route: Delete vehicle
// Example: /delete_vehicle/ABC123
router.get('/delete_vehicle/:plate', (req, res) => {

  // Fetch license plate
  const plate = req.params.plate;

  // Create query with the delete_vehicle stored procedure
  const query = `CALL delete_vehicle("${plate}")`;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
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
  const query = `CALL add_mail(${apt_recipient}, ${hu_recipient}, "${m_type}", "${a_time}", ${i_notified})`;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute the query (call to the database)
  connection.query(query, (err, results, fields) => {
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

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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
  const query = `CALL update_mail_to_claimed(${id})`;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute the query (call to the database)
  connection.query(query, [id], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred when trying to update the data from the database.');
      return;
    }
    // Verify if update was successful
    if (res.affectedRows === 0) {
      res.status(404).send(`No correspondence found under the ID ${id}`);
      return;
    } else {
      // Send a success response
      res.status(200).send(`Correspondence under the ID ${id} marked as claimed.`);
      return;
    }
  });
});

// Route: Login
router.get('/login/:username', (req, res) => {
  // Fetch the username
  const username = req.params.username;

  // Create the query to verify if the username is valid & fetch the data associated
  const query = 'SELECT * FROM login_system WHERE username = ?';

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Execute query (call to the database)
  connection.query(query, username, (err, rows) => {
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

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

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