const LocalStrategy = require('passport-local');
const { createUser, matchPassword, emailExists } = require('./helper');

module.exports = (passport: any) => {
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: String, password: String, done: Function) => {
        try {
          // const userExists = await emailExists(email)

          // if (userExists) {
          //   return done(null, false);
          // }

          //const user = await createUser(email, password);
          return done(null, {email,password});
        } catch (error) {
          done(error);
        }
      },
    ),
  );
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email:String, password:String, done:Function) => {
        try {
          const user = await emailExists(email);
          if (!user) return done(null, false);
          const isMatch = await matchPassword(password, user.password);
          if (!isMatch) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
