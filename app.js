const express = require("express");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const compression = require('compression');
const morgan = require('morgan');
const device = require('express-device');
//const cluster = require("cluster");
const { sessionStore } = require("./models/sql/database");
//const numCPUs = require("os").cpus().length;
require("./models/passport")(passport);
const hbs = require("hbs");
const { setMaxListeners, EventEmitter } = require("events");
require('dotenv').config();


const app = express();


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials/home");
hbs.registerPartials(__dirname + "/views/partials/basic");
hbs.registerPartials(__dirname + "/views/partials/cart");
hbs.registerPartials(__dirname + "/views/partials/checkout");
hbs.registerPartials(__dirname + "/views/partials/product");
hbs.registerPartials(__dirname + "/views/mobile/partials");
hbs.registerPartials(__dirname + "/views/partials/log");
hbs.registerHelper("rate", (values) => {
  let rating = [];
  for (let i = 0; i < Number(values); i++) {
    rating.push("<span>&starf;</span>");
  }
  return rating.join("");
});
hbs.registerHelper('image_url', ()=>{
  return process.env.IMAGE_URL;
})

const target = new EventTarget();
const emitter = new EventEmitter();
setMaxListeners(250, target, emitter);
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(express.static("./images"));
app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 259200000,
      httpOnly: true,
      secure: false,
    },
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
  })
);
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(device.capture());
app.use((req, res, next)=>{
  req.session.device = req.device.type ? req.device.type : "desktop";
  next();
});



app.use("/", require("./routes/router"));
app.get('/favicon.ico', (req, res)=>{
  res.status(204).end();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(req.session.device == "phone"){
    res.render('mobile/error');
  }else{
    res.render('view/error');
  }
});



//For Master process
// if (cluster.isMaster) {
// 	console.log(`Master ${process.pid} is running`);
// 	for (let i = 0; i < numCPUs; i++) {
// 		cluster.fork();
// 	}

// 	// This event is firs when worker died
// 	cluster.on('exit', (worker, code, signal) => {
// 		console.log(`worker ${worker.process.pid} died`);
// 	});
// }
// For Worker
//else{
// Workers can share any TCP connection
// In this case it is an HTTP server
//     app.listen(port, err =>{
//         err ?
//         console.log("Error in server setup") :
//     });
// }
//console.log(`Worker ${process.pid} started`);
module.exports = app;