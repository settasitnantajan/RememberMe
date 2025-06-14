// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRoutes'); // Import todo routes


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// --- API Endpoints ---
app.use('/todos', todoRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  console.error(err.stack);
  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong on the server!';

  res.status(statusCode).json({
    error: message,
  });
});
