const passport = require('passport')
const session = require("express-session")
const bodyParser = require("body-parser")
const env = require("dotenv").load()

let express = require("express")
let app = express()

//Import models and sync Sequelize
const models = require("./app/models") // get the index.js file from the models file
models.sequelize.sync() // sync all the models in the models folder
  .then(() => console.log("Database OK"))
  .catch(err => console.log("Database Error: " + err))

//Initialize bodyparser and format body to json format
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Initialize Passport by setting passport and express sessions as middleware
app.use(session({
  secret: "abcdef", //sets the session secret. TODO: move to environment file
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) //persistent login sessions

//Catch all GET requests with no specified pathnames
app.get('/', (req, res) => {
  res.send("Welcome to my app")
})

app.listen(3000, (err) => {
  if(!err) console.log("Server running on port 3000");
  else console.log(err);  
})