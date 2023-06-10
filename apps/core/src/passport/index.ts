const LocalStrategy = require("passport-local");
const { createUser } = require("./helper");

module.exports = (passport:any) => {
    passport.use(
      "local-signup",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email:String, password:String, done:Function) => {
          try {
            // const userExists = await emailExists(email)
   
            // if (userExists) {
            //   return done(null, false);
            // }
   
            const user = await createUser(email, password);
            return done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }