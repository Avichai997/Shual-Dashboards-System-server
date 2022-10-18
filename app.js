const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const csrf = require('csurf');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const typeRouter = require('./routes/typeRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const customerRouter = require('./routes/customerRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Implement CORS
const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
const corsOptions = {
  credentials: true, // allow coockies
  origin: (origin, callback) =>
    // (!origin) to allow Postman requests that comes without origin
    !origin || whitelist.indexOf(origin) !== -1
      ? callback(null, true) // allow request
      : callback(new AppError(`Origin: ${origin} Not allowed by CORS`)) // deny request
};
app.use(cors(corsOptions));
app.options('*', cors());

// Serving static files example: https://localhost:5000/img/users/usrename.jpeg
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

// ProtectAgainst csrf
const csrfProtection = csrf({
  cookie: true
});
app.use(csrfProtection);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      // All Models
      'id',
      '_id',
      'createdAt',
      'updatedAt',
      // User Model
      'name',
      'email',
      'photo',
      'role',
      'password',
      'passwordConfirm',
      'passwordChangedAt',
      'passwordResetToken',
      'passwordResetExpires',
      'active',
      // Customer Model
      'customerTypeId',
      'shualCityId',
      'lamas',
      'isTraining',
      'isEnabled',
      'logo',
      'location',
      // Dashboard Model
      'order',
      'name',
      'url',
      'includeShualCityId',
      'excludeShualCityId',
      'customerTypeId',
      // Type Model
      'name'
    ]
  })
);

// compress requests size
app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use('/api/users', userRouter);
app.use('/api/types', typeRouter);
app.use('/api/dashboards', dashboardRouter);
app.use('/api/customers', customerRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
