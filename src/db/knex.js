const knex = require("knex");
const knexfile = require("../knexfile");

require("dotenv").config();

const enviroment = process.env.NODE_ENV || "development";
const config = knexfile[enviroment];

console.log(`Connecting to database in ${enviroment} mode...`);
module.exports = knex(config);