const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Function to generate a random password including symbols
function generatePasswordWithSymbols(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>/?';
  let password = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < bytes.length; ++i) {
    const index = bytes[i] % charset.length;
    password += charset[index];
  }
  return password;
}

// Route to display the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to handle form submission
app.post('/generate-password', (req, res) => {
  const length = parseInt(req.body.bytes, 10); // Assume the length is half of bytes to match the charset
  const password = generatePasswordWithSymbols(length);
  res.send(`${password}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
