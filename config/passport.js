const passport = require('passport');
require('./strategies/local.strategy');
module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());


    //stores the user in the session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    //retrieve the user from the session
    passport.deserializeUser((user, done) => {
        //find user with id (if we were just storing the userid)
        done(null, user);
    });


}