-- Create the database movie_planner_db and specified it for use.
CREATE DATABASE burgers_db;
USE burgers_db;;

-- Create the table plans.
CREATE TABLE burgers
(
id int NOT NULL AUTO_INCREMENT,
burger_name varchar(255) NOT NULL,
devoured BIT 1,
PRIMARY KEY (id)
);

-- Insert into burgers table dynamicly from the submit button from the index.handlebars file
INSERT INTO burgers () VALUES ('');