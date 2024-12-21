# Backend API Documentation

## API Routes

### 1. Input Items - POST
- **Route**: `/inputItems`
- **Method**: POST
- **Sample Payload**:

```json
[
    {
        "name": "onion",
        "quantity": 1000,
        "unit": "grams"
    },
    {
        "name": "potato",
        "quantity": 2000,
        "unit": "grams"
    },
    {
        "name": "chicken",
        "quantity": 2000,
        "unit": "grams"
    }
]
```

### 2. Add Item - POST
- **Route**: `/addItem`
- **Method**: POST
- **Sample Payload**:

```json
{
    "name": "onion",
    "quantity": 1000,
    "unit": "grams"
}
```


### 3. Update Item After Shopping - PUT
- **Route**: `/updateItem`
- **Method**: PUT
- **Sample Payload**:

```json
{
    "name": "onion",
    "purchased_quantity": 1000,
    "unit": "grams"
}
```




### 4. Add Raw Recipe Text - POST
- **Route**: `/addRawRecipeText`
- **Method**: POST
- **Sample Payload**:

```json
{
    "dish_name": "onion soup",
    "description": "warm comforting soup made with onion chicken and lots of pepper. Give proper amount of salt and chili. Takes your like to peel and chop the onions to little pieces. Cook the chicken to perfection, it requires 20 minutes to cook a perfect chicken. Simmer all the ingredients except chicken, add the chicken after 10 minutes. You are good to go"
}
```

<!-- ### 5. Add Raw Recipe Image - POST
- **Route**: `/addRawRecipeImage`
- **Method**: POST
- **Sample Payload**:

```json
{
    "dish_name": "onion soup",
    "image": "base64_encoded_image_string"
}
``` -->


### 6. Chat with Chatbot - POST
- **Route**: `/sendMessage`
- **Method**: POST
- **Sample Payload**:

```json
{
    "user_msg": "I am craving a soup. Suggest me something"
}
```

- **Sample Response**:

```json
{
    "status": "success",
    "user_msg": "I am craving a soup. Suggest me something",
    "bot_response": "Okay, I'm craving soup too! Let's see what I can whip up with your available ingredients: chicken, onion, potato, broccoli, pepper, and chili. Based on your ingredients and craving, I can suggest a recipe.\n\n**Recipe Name:** Spicy Chicken and Vegetable Soup\n\n**Origin:** A fusion of various comfort food soups!\n\n**Recommended When:** Feeling a little under the weather, craving warmth and spice, or just need a hearty and flavorful meal.\n\n**Required Ingredients:**\n\n* 1 lb boneless, skinless chicken breast, cut into bite-sized pieces\n* 1 large onion, chopped\n* 2 medium potatoes, peeled and diced\n* 1 head broccoli, cut into florets\n* 1 bell pepper (any color), chopped\n* 1-2 fresh chili peppers (serrano or jalapeño), finely minced (adjust to your spice preference)\n* 4 cups chicken broth\n* 1 tsp olive oil\n* Salt and pepper to taste\n* Optional: Fresh cilantro or parsley for garnish\n\n**Process:**\n1. Heat olive oil in a large pot or Dutch oven over medium heat. Add the onion and cook until softened, about 5 minutes.\n2. Add the chicken and cook until browned on all sides.\n3. Stir in the potatoes, broccoli, bell pepper, and chili peppers. Cook for another 2-3 minutes.\n4. Pour in the chicken broth. Bring to a boil, then reduce heat and simmer for 20-25 minutes, or until the ingredients are tender."
}
```

---

## Structure of Recipes in `my_fav_recipes.txt`
Each recipe is stored as a JSON object with the following structure:

```json
{
    "dish_name": "onion soup",
    "ingredients": ["onion", "chili", "chicken"],
    "taste": "spicy",
    "reviews": "good for warm days",
    "cuisine_type": "french",
    "preparation_time": "2 hours"
}
