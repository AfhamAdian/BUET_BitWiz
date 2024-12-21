CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity NUMERIC DEFAULT 0, -- Amount of the ingredient
    unit VARCHAR(50),          -- Unit of measurement (e.g., grams, liters)
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


create table raw_recipe_text (
    id SERIAL PRIMARY KEY,
    dish_name VARCHAR(255) NOT NULL,                -- Title of the recipe
    description VARCHAR(1500) not null,                           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE raw_recipe_image (
    id SERIAL PRIMARY KEY,
    dish_name VARCHAR(255) not null,
    image_data BYTEA NOT NULL,  -- BYTEA is used to store binary data
    							-- We are storing the image as BLOB
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
