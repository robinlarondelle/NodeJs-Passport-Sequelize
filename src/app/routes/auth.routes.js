var authController = require('../controllers/auth.controller');
 
module.exports = function(app) {
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
}