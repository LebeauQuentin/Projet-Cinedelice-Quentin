BEGIN;


DROP TABLE IF EXISTS "recipe_diet_assignation", "recipe_ingredient_assignation", "recipe", "users", "ingredient", "category", "diet", "movie";



CREATE TABLE "users" (
   id SERIAL PRIMARY KEY,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   is_admin BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL
);


CREATE TABLE "ingredient" (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) UNIQUE NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL
);


CREATE TABLE "category" (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) UNIQUE NOT NULL,
   color VARCHAR(7) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL
);


CREATE TABLE "diet" (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) UNIQUE NOT NULL,
   color VARCHAR(7) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL
);
CREATE TABLE "movie" (
   id SERIAL PRIMARY KEY,
   title VARCHAR(255) UNIQUE NOT NULL,
   description TEXT NULL,
   director VARCHAR(255) NULL,
   actors TEXT NULL,
   year INT NULL,
   image VARCHAR(255) NULL,
   funfact TEXT NULL,
   category VARCHAR(255) NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL
);


CREATE TABLE "recipe" (
   id SERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   duration INT NOT NULL,
   description TEXT NOT NULL,
   difficulty VARCHAR(255) NOT NULL DEFAULT 'MOYEN',
   instruction TEXT NOT NULL,
   image VARCHAR(255) NOT NULL,
   movie_id INT NOT NULL,
   category_id INT NOT NULL,
   user_id INT NOT NULL,
   validated BOOLEAN NOT NULL DEFAULT FALSE,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL,
   FOREIGN KEY (movie_id) REFERENCES "movie"(id),
   FOREIGN KEY (category_id) REFERENCES "category"(id),
   FOREIGN KEY (user_id) REFERENCES "users"(id)
);


CREATE TABLE "recipe_diet_assignation" (
   id SERIAL PRIMARY KEY,
   recipe_id INT NOT NULL,
   diet_id INT NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL,
   FOREIGN KEY (recipe_id) REFERENCES "recipe"(id),
   FOREIGN KEY (diet_id) REFERENCES "diet"(id)
);


CREATE TABLE "recipe_ingredient_assignation" (
   id SERIAL PRIMARY KEY,
   recipe_id INT NOT NULL,
   ingredient_id INT NOT NULL,
   quantity INT NOT NULL,
   unit VARCHAR(255) NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NULL,
   deleted_at TIMESTAMP NULL,
   FOREIGN KEY (recipe_id) REFERENCES "recipe"(id),
   FOREIGN KEY (ingredient_id) REFERENCES "ingredient"(id)
);

COMMIT;


