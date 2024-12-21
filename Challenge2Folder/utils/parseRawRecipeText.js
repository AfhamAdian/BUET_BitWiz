const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function parseRawRecipeTextToRecipeJson( dish_name, description){
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    try{
        const chat = await model.startChat({
        history: [
            {
            role: "user",
            parts: [
                {
                text: `You are a recipe extractor. I will provide you with a dish_name and a description.
                        From that description extract taste (string; give a taste type in one word from the vibe of the recipe),
                        ingredients(which is a array of string; it will never be empty), review (string; give a review or recommendation based on the vibe; might be empty),
                        cuisine_type (string; assign a type based on vibe; might be empty), and preparation_time (minutes in number; assign a time in minutes; will not be empty).
                        Then reply me pure JSON format example:
                        {
                            "dish_name": ${dish_name},
                            "ingredients" : [ "onion", "chili", "chicken" ],
                            "taste": "spicy",
                            "reviews": "good for warm days",
                            "cuisine_type": "french",
                            "preparation_time": "2hours"
                        }`,
                },
            ],
            },
            {
            role: "model",
            parts: [
                {
                text: "Sure! Give me the description, I will return the JSON format.",
                },
            ],
            },
        ],
        generationConfig: {
            maxOutputTokens: 400,
        },
        });

        const result = await chat.sendMessage(description);
        const response = await result.response;

        const text = response.text();
        return text
    }catch( err ){
        console.error("Error parsing recipe text:", err);
        return null;
    }
}


module.exports = { parseRawRecipeTextToRecipeJson }