const express = require('express');
const app = express();
const morgan =require('morgan');
require('dotenv').config();
require('./config/passport');
const passport = require('passport');
const session = require('express-session');

app.use(morgan('dev'));
app.use(express.json());
app.set('json spaces', 2);

/*SESION */
app.use(session({secret:'clavesecreta', resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

/*RUTAS DE LA API */
app.use('/api', require('./routes/index'));
app.use('/api/categorias', require('./routes/categoria'));
app.use('/api/marca',require('./routes/marca'));
app.use('/api/catalogo', require('./routes/catalogo'));
app.use('/api/publico',require('./routes/publico'));
app.use('/api/tipousuario', require('./routes/tipousuario'));
app.use('/api/categoriaedades',require('./routes/categoriaedades'));
app.use('/api/producto',require('./routes/producto'));
app.use('/api/usuario', require('./routes/routeUsuario'));

/*SHOW CONNECTION */
app.use(express.urlencoded({extended: false}));
app.listen(3003,()=>{console.log('servidor inicializado')});