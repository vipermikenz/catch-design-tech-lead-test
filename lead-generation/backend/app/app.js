require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const leadRoutes = require('../src/routes/leadRoutes');

const app = express();

// Middleware setup (helmet, morgan, rate limiting, CORS, body parsing)
app.use(helmet());
app.use(morgan('combined'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use(limiter);

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [process.env.ALLOWED_ORIGIN];
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use('/api/v1/leadGeneration', leadRoutes);

// Error handling
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).send('Not allowed by CORS');
  }
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app without starting the server
module.exports = app;

// If this file is run directly (not imported), start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}