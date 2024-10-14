import dotenv from 'dotenv';
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import connectDB from './server/config/db.js';
import mainRoutes from './server/routes/main.js';

dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;

// Database Connection
connectDB();

// Middleware; Enable search through forms
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('common'));

// Middleware; Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); 
app.set('view engine', 'ejs');

app.use('/', mainRoutes); // for main routes

app.listen(PORT, ()=> {
    console.log(`Node app listening on port ${PORT}`);
});