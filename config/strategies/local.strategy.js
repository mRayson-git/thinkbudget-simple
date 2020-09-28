const passport = require('passport');
const { Strategy } = require ('passport-local');
/* Essentially a strategy is how we deal with a username
and password */
module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done ) => {
            const user = {
                username, password
            }
            done(null, user);
        }
    ));
}