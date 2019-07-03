const morgan = require('morgan'),
  cors = require('cors'),
  express = require('express'),
  bodyParser = require('body-parser'),
  restFul  = require('express-method-override')('_method'),
  app = express(),
  ioServer = require('./server/index')(app),
  PORT = (process.env.PORT || 6000);

/*
  Routers
*/
const indexRouter = require('./routes/index');

/*
  Settings
*/
app.set("port", PORT);

/*
  Middlewares
*/
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(bodyParser.json());
app.use(restFul);

/*
  Global variables
*/
app.use((req, res, next) => {
  next();
});

/*
  Routes
*/
app.use(indexRouter)

/*
  Route not found 404
*/
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route '+req.url+' Not found.' });
});
/*
  Server start
*/
ioServer.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});
