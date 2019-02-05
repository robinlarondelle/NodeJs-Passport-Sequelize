const bcrypt = require("bcrypt");

module.exports = function (passport, user) {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  
  function (req, email, password, done) {
    var generateHash = function (password) {
      return bcrypt.hashSync(passport, bcrypt.genSaltSync(8), null)
    }

    User.findOne({ where: { email: email } }).then(user => {
      if (user) return done(null, false, { message: "email already taken" })
      else {
        let userPassword = generateHash(password)
        let data = {
          email: email,
          password: userPassword,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        }

        User.create(data).then((newUser, created) => {
          if (!newUser) return done(null, false)
          if (newUser) return done(null, newUser)
        })
      }
    })
  }))
}

