const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { parseRawRecipeTextToRecipeJson }= require('./utils/parseRawRecipeText.js');
const { appendToRecipeList } = require('./utils/appendToRecipeList.js');

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



app.post('/addItem', async (req, res) => {
    try {
        const { name, quantity, unit } = req.body;
        console.log('Received:', name, quantity, unit);

        await pool.query(
          "INSERT INTO ingredients (name, quantity, unit) VALUES ($1, $2, $3)",
          [name, quantity, unit]
        );
        res.status(200).send('Item inserted successfully');

    } catch (err) {
        console.error('Error while inserting item:', err);
        res.status(500).send('Error while inserting item');
    }
});


app.post('/inputItems', async (req, res) => {
    try {
        const items = req.body;
        console.log('Received:', items);

        const query = items.map((item, index) => {
            return pool.query(
              "INSERT INTO ingredients (name, quantity, unit) VALUES ($1, $2, $3)",
              [item.name, item.quantity, item.unit]
            );
        });

        await Promise.all(query);
        res.status(200).send('Items inserted successfully');

    } catch (err) {
        console.error('Error while inserting items:', err);
        res.status(500).send('Error while inserting items');
    }
});


app.put('/updateItem', async (req, res) => {
    try {
        const { name, purchased_quantity, unit } = req.body;
        console.log('Received:', name, purchased_quantity, unit);

        const result = await pool.query(
            "SELECT quantity FROM ingredients WHERE LOWER(name) = $1 AND LOWER(unit) = $2",
            [name.toLowerCase(), unit.toLowerCase()]
        );
        const previousQuantity = result.rows[0]?.quantity || 0;

        await pool.query(
          "UPDATE ingredients SET quantity = $2 WHERE LOWER(name) = $1 AND LOWER(unit) = $3",
          [ name.tolowercase, purchased_quantity+previousQuantity, unit]
        );

        res.status(200).send('Item updated successfully')
    } catch (err) {
        console.error('Error while updating item:', err);
        res.status(500).send('Error while updating item');
    }
});




app.post("/addRawRecipeText", async( req, res )=> {
    try {
        const { dish_name, description } = req.body;

        await pool.query(
          "INSERT INTO raw_recipe_text (dish_name, description) VALUES ($1, $2)",
          [dish_name, description]
        );
        console.log('Recipe text inserted');

        const recipeJson = await parseRawRecipeTextToRecipeJson(dish_name, description);
        console.log( 'Recipe text parsed successfully');
        console.log( recipeJson );

        await appendToRecipeList(recipeJson);
        console.log('Recipe text appended to file');

        res.status(200).send('Recipe text inserted and Parsed and Appended successfully');
    } catch (err) {
        console.error('Error while inserting recipe text:', err);
        res.status(500).send('Error while inserting recipe text');
    }
});


app.post