const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware configurations
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Contact API Endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [name, email, message]);

    console.log(`📩 New message from ${name} (${email}) saved to database.`);
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Error inserting completely into database:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An internal server error occurred.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
