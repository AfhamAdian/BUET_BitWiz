const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function recipeReader() {
    const filePath = path.join(__dirname, '..', 'my_fav_recipes.txt');
    const text = fs.readFileSync(filePath, "utf8");

  return text;
}

async function initiateChat( ingredient_names ) {
  const userHistory = await recipeReader();

  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
            {
                text:`Your are a food assistant who will read all the recipes in a json form.
                        There will various tags in each recipe in json form. After taking this data into your memory
                        you will help me recommend dish based on my mood and the ingredients I have.
                        I will provide the ingredient's name in a string array. Reply me with in a way that
                        you have the recipe name on top, you might tell about where it s from, when it is recommended, then tell the required ingredients, 
                        then the process, them time required.
                        Available ingredients are ${ ingredient_names}`,
            },
        ],
      },
      {
        role: "model",
        parts: [{ text: "Sure! Tell me about your feelings?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 350,
    },
  });

  return chat;
}

async function sendMessageReturnsResponseText(chatObject, msg) {
  const result = await chatObject.sendMessage(msg);
  const response = await result.response;
  const text = response.text();

  return text;
}

module.exports = { initiateChat, sendMessageReturnsResponseText };
