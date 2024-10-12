import dotenv from 'dotenv';
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import mainRoutes from './server/routes/main.js';

dotenv.config();
const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static('common'));

// Middleware; Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); 
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.send("Testing app 123");
});
app.listen(PORT, ()=> {
    console.log(`Node app listening on port ${PORT}`);
});