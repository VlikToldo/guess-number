const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let secretNumber;

app.post('/start_game', (req, res) => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({ message: 'Game started', status: 'success' });
});

app.post('/guess', (req, res) => {
  const { guess } = req.body;

  if (typeof guess !== 'number' || isNaN(guess)) {
    return res.status(400).json({ message: 'Invalid input: guess must be a number', status: 'error' });
  }

  if (guess < 1 || guess > 100) {
    return res.status(400).json({ message: 'Invalid input: guess must be between 1 and 100', status: 'error' });
  }

  if (guess > secretNumber) {
    return res.status(200).json({ message: 'The number is lower', status: 'lose' });
  } else if (guess < secretNumber) {
    return res.status(200).json({ message: 'The number is higher', status: 'lose' });
  } else {
    return res.status(200).json({ message: 'You guessed it!', status: 'win' });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
