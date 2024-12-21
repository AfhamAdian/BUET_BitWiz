const fs = require('fs');
const path = require('path');

async function appendToRecipeList(recipe) {
    const filePath = path.join(__dirname, '..', 'my_fav_recipes.txt');
    fs.appendFile(filePath, recipe + '\n', (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        } else {
            console.log('Recipe appended successfully!');
        }
    });
}

module.exports = { appendToRecipeList };