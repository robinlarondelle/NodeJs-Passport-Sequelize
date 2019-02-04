/*
* This file is used to import all the model files in the modelfolder, and export them
*/

"use strict"

const fs = require("fs") //Using the Node.js File System (fs) to use CRUD on files
const path = require('path')
const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || "development" //Get the current NODE_ENV environment vaiable
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]; //Connect to the correct config, depending on the NODE_ENV
const sequelize = new Sequelize(config.database, config.username, config.password, config); //Setup Sequelize witht the config credentials
const db = {};

fs
  .readdirSync(__dirname) // __dirname is a Global Attribute which returns an String[] with all files from the current directory
  .filter(file => { //Filter for every file in the String[]
    file.indexOf(".") !== 0 && file !== "index.js" //Not interested in the current file, and not interested in the index.js file
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file)) // Import all the model files from this directory
    db[model.name] = model // And add them to the Database
  })
 

Object.keys(db).forEach(modelName => { // For every entry in the Db object
  if ("associate" in d[modelName]) {
    db[modelName].associate(db) // Associate the entry to the database
  }
})

sequelize.authenticate().then(function(){
  console.log("sucess");
}).catch(function(error){
  console.log("error: "+error);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;