var authController = require('../controllers/auth.controller');
 
module.exports = function(app, passport) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successredirect: "/dashboard", 
        failureRedirect: '/signup'
    }))
}