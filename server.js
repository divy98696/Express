const path = require('path');
const express = require('express');
const colors = require('colors');
const fileupload = require('express-fileupload');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load Env vars
dotenv.config({ path: './config/config.env' });

//Connect to Datababse
connectDB();

//Route Files
const bootcamps = require('./routes/bootcamp');
const courses = require('./routes/courses');
const auth = require('./routes/Auth');
const users = require('./routes/user');
const reviews = require('./routes/review');

const app = express();

//Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// To remove data, use:
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File Uploading
app.use(fileupload());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //Close server & exit process
  server.close(() => process.exit(1));
});
