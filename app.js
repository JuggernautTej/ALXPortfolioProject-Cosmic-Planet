import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import connectDB from './server/config/db.js';
import mainRoutes from './server/routes/main.js';
import theAdmin from './server/routes/admin.js';

dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;

// Database Connection
connectDB();

// Middleware; Enable search through forms
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// Middleware; cookie and session mangement
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: { maxAge: new Date ( Date.now() + (7200000) ) }
}));


app.use(express.static('common'));

// Middleware; Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); 
app.set('view engine', 'ejs');

app.use('/', mainRoutes); // for main routes
app.use('/', theAdmin); // for the admin route

app.listen(PORT, ()=> {
    console.log(`Node app listening on port ${PORT}`);
});