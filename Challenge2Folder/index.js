const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS for all routes
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all methods
  allowedHeaders: "*", // Allow all headers
};
app.use(cors(corsOptions));



const port = process.env.PORT || 8888;
app.listen( port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        console.log('Database is connected');
        res.status(200).send("Hello World");
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection error');
        return;
    }
});