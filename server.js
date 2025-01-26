// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Create an Express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection using Mongoose
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Define a schema for the contact form messages
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model for the messages
const Message = mongoose.model('Message', messageSchema);

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve the index.html file directly
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  // Get the form data from the request body
  const { name, email, message } = req.body;

  // Create a new message instance
  const newMessage = new Message({
    name: name,
    email: email,
    message: message,
  });

  // Save the new message to the database
  newMessage.save()
    .then(() => {
      console.log('Message saved to database');
      res.redirect('/');  // Redirect back to homepage after submission
    })
    .catch((err) => {
      console.log('Error saving message:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
