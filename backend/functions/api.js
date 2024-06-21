import express from 'express';
import mysql from 'mysql';
import env from 'dotenv';
import serverless from 'serverless-http';
import jwt from 'jsonwebtoken';

// Start app & router with Express
const app = express();
const router = express.Router();

// Call all the vars stored in .env
env.config()
const passwordbd = process.env.DB_PASSWORD;
const hostdb = process.env.DB_HOST;
const userdb = process.env.DB_USER;
const namedb = process.env.DB_NAME;
const portdb = process.env.DB_PORT;
const timezonedb = process.env.DB_TIMEZONE;

// Create a connection pool
const connection = mysql.createPool({
  connectionLimit: 10,
  host: hostdb,
  user: userdb,
  password: passwordbd,
  database: namedb,
  port: portdb,
  timezone: timezonedb,
  connectTimeout: 10000, // 10 seconds
  acquireTimeout: 10000
});

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

// Route to obtain data related to inhabitants living in a given apartment
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
      res.status(500).send('There was an error trying to fetch specific inhabitants data from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows[0]); // Send the data obtained as .json to the client
      return;
    }
  });
});

// Route: Obtain data from all the inhabitants in record
router.get('/inhabitants', (req, res) => {

  // Create the query
  const query = 'SELECT * FROM inhabitant;';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).send('There was an error trying to fetch inhabitants data from the database.');
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
      res.status(500).send('There was an error trying to send data related to non-frequent visitors to the database.');
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
router.get('/visitors/:tower/:apartment', (req, res) => {

  // Fetch parameters from the previous link
  const { tower, apartment } = req.params;

  // Create the query using get_visitors_info
  const query = `CALL get_visitors_info(?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [tower, apartment], (err, rows) => {
    // Query failed
    if (err) {
      console.error('There was an error executing the query:', err);
      res.status(500).send('There was an error trying to fetch visitors related data from the database.');
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
      res.status(500).send('There was an error trying to delete data related to the visitor log from the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: `The visit log ${visit_id_log} has been deleted succesfully.`});
      return;
    }
  });
});


// Route: Add correspondence or mail
// Example: /add_mail/101/1/Letters/YYYY-MM-DD HH:MM:SS/0
router.get('/add_mail/:apt_recipient/:hu_recipient/:m_type/:a_time/:i_notified', (req, res) => {

  // Fetch the parameters from the previous link
  const { apt_recipient, hu_recipient, m_type, a_time, i_notified } = req.params;

  // Create the query with the add_mail stored procedure
  const query = `CALL add_mail(?, ?, ?, ?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [m_type, a_time, apt_recipient, hu_recipient, i_notified], (err, results, fields) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).json({ err: 'An error occurred while trying to manipulate data related to correspondence onto the database.' });
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

// Route: Unclaimed Correspondence View
router.get('/unclaimed_correspondence/:tower/:apartment', (req, res) => {

  // Fetch the parameters from the previous link
  const { tower, apartment } = req.params;
  
  // Create the query using get_unclaimed_mail_info
  const query = `CALL get_unclaimed_mail_info(?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [tower, apartment], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to fetch data related to correspondence from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: All Correspondence
router.get('/correspondence/:tower/:apartment', (req, res) => {

  const { tower, apartment } = req.params;
  
  // Create the query using get_all_mail_info
  const query = `CALL get_all_mail_info(?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [tower, apartment], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to fetch data related to correspondence from the database.');
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
      res.status(500).send('An error occurred while trying to update the information relating to the correspondence claimed status from the database.');
      return;
    }
    // Verify if update was successful
    if (res.affectedRows === 0) {
      res.status(404).send(`No correspondence found.`);
      return;
    } else {
      // Send a success response
      res.status(200).send(`The correspondence has been succesfully marked as claimed.`);
      return;
    }
  });
});

// Route: View Logs
router.get('/view_logs', (req, res) => {

  // Create the query calling the update_mail_to_claimed stored procedure
  const query = `SELECT * FROM logs;`;

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to fetch the logs from the database.');
      return;
    }
    // Query success
    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Add Log
// Example: /add_log/DEBUG/Ejecucion Funcion X/Correspondencia
router.get('/add_log/:log_level/:log_message/:context', (req, res) => {

  // Fetch the parameters from the previous link
  const { log_level, log_message, context } = req.params;

  let query;

  switch (log_level) {
    case "DEBUG":
      query = `CALL log_debug(?, ?);`;
        break;
    case "INFO":
      query = `CALL log_info(?, ?);`;
        break;
    case "ERROR":
      query = `CALL log_error(?, ?);`;
        break;
    default:
      res.status(400).send('Invalid log level.');
      return;
  }

  // Execute the query (call to the database)
  connection.query(query, [log_message, context], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to create logs and add them to the database.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Log added successfully.'});
      return;
    }
  });
});

// Route: Add a frequent visitor
router.get('/frequent_visit/:run', (req, res) => {

  // Fetch parameters from the previous link
  const {run} = req.params;

  // Create the query calling the update_mail_to_claimed stored procedure
  const query = `CALL check_and_add_visitor(?)`;

  // Execute the query (call to the database)
  connection.query(query, [run], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred while trying to update the data related to frequent visitors from the database.');
      return;
    }

    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Add a frequent visitor (general use)
router.get('/new_frequent_visit/:name/:last_name/:rut/:dv/:birthdate/:apartment/:tower', (req, res) => {

  // Fetch parameters from the previous link
  const { name, last_name, rut, dv, birthdate, apartment, tower } = req.params;

  // Create the query calling the update_mail_to_claimed stored procedure
  const query = `CALL add_frequent_visitor(?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query (call to the database)
  connection.query(query, [name, last_name, rut, dv, birthdate, apartment, tower], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred while trying to upload the data related to the frequent visitor to the database.');
      return;
    }

    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Delete message
router.get('/delete_msg/:id', (req, res) => {

  // Fetch parameters from the previous link
  const { id } = req.params;

  // Create the query calling the update_mail_to_claimed stored procedure
  const query = `DELETE FROM messaging WHERE id = ?;`;

  // Execute the query (call to the database)
  connection.query(query, [id], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred while trying to update the data related to the messaging from the database.');
      return;
    }

    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Get messages view
router.get('/get_msg/:tower', (req, res) => {

  // Fetch parameters from the previous link
  const { tower } = req.params;

  // Create the query calling the get_messages stored procedure
  const query = `CALL get_messages(?);`;

  // Execute the query (call to the database)
  connection.query(query, [tower], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred while trying to fetch data related to messaging from the database.');
      return;
    }

    else {
      res.json(rows); // Send data as .json to the client
      return;
    }
  });
});

// Route: Create a new message
router.get('/new_msg/:id/:tower/:message', (req, res) => {

  // Fetch parameters from the previous link
  const { id, tower, message } = req.params;

  // Create the query calling the send_message stored procedure
  const query = `CALL send_message(?, ?, ?);`;

  // Execute the query (call to the database)
  connection.query(query, [id, tower, message], (err, rows) => {
    // Query failed
    if (err) {
      res.status(500).send('An error occurred while trying to create data related to messaging.');
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

  // Execute query (call to the database)
  connection.query(query, [username], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to authenticate the user.');
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
router.get('/token/:username/:notexpire', (req, res) => {

  // Fetch username and password
  const username = req.params.username;
  const notexpire = req.params.notexpire;

  // Create and sign token
  const customTime = Math.floor(Date.now() / 1000) + (60 * 60 * 2); // 2 hours by default
  const payload = { username: username, customTime: customTime};
  const secretKey = 'Stack';

  let token;
  if (notexpire === 'true') {
    // Token does not expire
    token = jwt.sign(payload, secretKey);
  } else {
    // Token expires after 2hrs
    token = jwt.sign(payload, secretKey, { expiresIn: '2h' });
  }

  // Send token (HttpOnly for extra security)
  res.cookie('token', token, { httpOnly: true });
  res.send({token});
});

// Route: UpdatePassword
router.get('/updatepassword/:username/:newpassword', (req, res) => {

  // Fetch the username and newpassword
  const username = req.params.username;
  const newpassword = req.params.newpassword;

  // Create the query to get username and newpassword
  const query = 'UPDATE login_sys SET password_hashed = ? WHERE username = ?';

  // Execute query (call to the database)
  connection.query(query, [newpassword, username], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to change the password.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Password updated successfully.'});
      return;
    }
    }
  );
});

// Route: /updateparkingtime
router.get('/updateparkingtime/:id/:parking_limit_time', (req, res) => {

  // Fetch the username and newpassword
  const id = req.params.id;
  const parking_limit_time = req.params.parking_limit_time;

  // Create the query to get username and newpassword
  const query = 'UPDATE tower SET parking_limit_time  = ? WHERE id = ?';

  // Execute query (call to the database)
  connection.query(query, [parking_limit_time, id], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to change the time limit.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Time limit updated successfully.'});
      return;
    }
    }
  );
});

// Route: /updatetimenotification
router.get('/updatetimenotification/:id/:parking_time_window', (req, res) => {

  // Fetch the username and newpassword
  const id = req.params.id;
  const parking_time_window = req.params.parking_time_window;

  // Create the query to get username and newpassword
  const query = 'UPDATE tower SET parking_time_window = ? WHERE id = ?;';

  // Execute query (call to the database)
  connection.query(query, [parking_time_window, id], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to change the time notification.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Time notification updated successfully.'});
      return;
    }
    }
  );
});

// Route: /updateparkingammount
router.get('/updateparkingammount/:id/:parking_spot_ammount', (req, res) => {

  // Fetch the username and newpassword
  const id = req.params.id;
  const parking_spot_ammount = req.params.parking_spot_ammount;

  // Create the query to get username and newpassword
  const query = 'UPDATE tower SET parking_spot_ammount = ? WHERE id = ?;';

  // Execute query (call to the database)
  connection.query(query, [parking_spot_ammount, id], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      res.status(500).send('An error occurred while trying to change the ammount.');
      return;
    }
    // Query success
    else {
      res.status(200).json({ message: 'Ammount parking updated successfully.'});
      return;
    }
    }
  );
});

// Route: /gettowerinfo
router.get('/gettowerinfo/:id', (req, res) => {

  // Fetch the username and newpassword
  const id = req.params.id;

  // Create the query to get username and newpassword
  const query = 'SELECT * FROM tower WHERE id = ?;';

  // Execute query (call to the database)
  connection.query(query, [id], (err, rows) => {
    // Query failed
    if (err) {
      console.error('An error occurred while trying to execute the query:', err);
      return;
    }
    // Query success
    else {
      res.json(rows);
      return;
    }
    }
  );
});

// Route: View currently parked vehicles
router.get('/parked_vehicles', (req, res) => {
  // Create the query to fetch data from the currently_parked_vehicles table
  const query = 'SELECT * FROM currently_parked_vehicles';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Route: View particular vehicle log
router.post('/parking_log', (req, res) => {
  // Create the query to insert data into particular_vehicle_log table
  const query = 'SELECT * FROM particular_vehicle_log';

  // Execute the query (call to the database)
  connection.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Route: Assign parking spot
router.post('/assign_parking_spot/:visitor_run/:t_id/:l_plate/:p_spot', (req, res) => {
  // Fetch parameters from the request body
  const { visitor_run, t_id, l_plate, p_spot } = req.body;

  // Create the query to call the assign_parking_spot stored procedure
  const query = 'CALL assign_parking_spot(?, ?, ?, ?)';

  // Execute the query (call to the database)
  connection.query(query, [visitor_run, t_id, l_plate, p_spot], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Parking spot assigned successfully');
    }
  });
});

// Route: Free parking spot
router.get('/free_parking_spot/:log_id', (req, res) => {
  // Fetch the log_id parameter
  const { log_id } = req.params;

  // Create the query to call the free_parking_spot stored procedure
  const query = 'CALL free_parking_spot(?)';

  // Execute the query (call to the database)
  connection.query(query, [log_id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Parking spot free successfully');
    }
  });
});

// Start the server
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);