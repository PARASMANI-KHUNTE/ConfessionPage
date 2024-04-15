const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
require("dotenv").config();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));


// Route to serve main.js file
app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.js'));
});

// MongoDB Atlas connection string
const mongoURI = process.env.mongostr;


// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define a schema for the confession data
const confessionSchema = new mongoose.Schema({
    username: String,
    confession: String
});

// Create a model based on the schema
const Confession = mongoose.model('Confession', confessionSchema);





// Serve home.html from the 'templates' directory inside 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'home.html'));
});

// // Route to handle form data submission
// app.post('/submitConfession', (req, res) => {
//     const formData = req.body;
//     console.log(formData); // Do something with the form data, such as saving it to a database
//     res.sendStatus(200); // Send a response back to the client
// });


// Route to handle form data submission
app.post('/submitConfession', (req, res) => {
    const { username, confession } = req.body;

    // Create a new Confession document
    const newConfession = new Confession({
        username: username,
        confession: confession
    });

    // Save the new Confession document to the database
    newConfession.save()
        .then(() => {
            console.log('Confession saved successfully');
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('Error saving confession:', err);
            res.status(500).send('Error saving confession');
        });
});



// Handle button click to redirect to login page
app.post('/adminLoginClick', (req, res) => {
    // Here you can perform any necessary processing
    // For example, logging the button click
    console.log('Admin button clicked');

    // Send response indicating success
    res.sendStatus(200);
});



app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'templates', 'mainAdmin.html'));
});


// Route to handle password validation
app.post('/validatePassword', (req, res) => {
    const { password } = req.body;

    // Perform password validation logic here
    // For demonstration purposes, let's assume the correct password is 'admin123'
    const correctPassword = process.env.adminPs;

    if (password === correctPassword) {
        // Password is correct
        res.sendStatus(200);
    } else {
        // Password is incorrect
        res.status(401).send('Invalid password');
    }
});

// Route to count the number of documents in the collection
app.get('/count', async (req, res) => {
    try {
        // Count the number of documents in the collection
        const count = await Confession.countDocuments();
        // Log the count to the terminal
        console.log('Number of documents:', count);
        res.json({ count });
        
    } catch (err) {
        console.error('Error counting documents:', err);
        res.status(500).send('Error counting documents');
    }
});



// Route to fetch all confessions from the collection
app.get('/confessions', async (req, res) => {
    try {
        // Fetch all confessions from the database
        const confessions = await Confession.find();

        // Send the confessions data as a JSON response
        res.json({ confessions });
    } catch (err) {
        console.error('Error fetching confessions:', err);
        res.status(500).send('Error fetching confessions');
    }
});






// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
