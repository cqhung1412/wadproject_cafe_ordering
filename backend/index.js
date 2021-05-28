if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');  // parser for request & response with json body
const mongoose = require('mongoose');       // MongoDB connector
const helmet = require('helmet');           // protection from common attack
const compression = require('compression'); // compress sent data to reduce workload
const morgan = require('morgan');           // logging
const cors = require('cors');               // preventing cors error

const mongooseUri = require('./util/database');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());

app.use(bodyParser.json()) // application/json
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  next();
});

app.use(authRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
  const { error } = req;
  if (error) {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
  }
});

mongoose.connect(
  mongooseUri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
  .then(result => {
    const server = app.listen(process.env.PORT || 8080);
    const io = require('./util/socket').init(server);
    io.on('connection', socket => {
      console.log(`Client ${socket.client.id} connected to socket.io`);
      io.on('disconnect', reason => {
        console.log(reason);
      });
    });
  })
  .then(() => console.log('Running on port: ' + (process.env.PORT || 8080)))
  .catch(err => console.log(err));
