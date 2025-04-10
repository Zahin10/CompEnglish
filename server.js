// server.js - The main Express.js server file

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/evidence1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'evidence1.html'));
});

app.get('/evidence2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'evidence2.html'));
});

app.get('/evidence3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'evidence3.html'));
});

app.get('/conclusion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'conclusion.html'));
});

app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

