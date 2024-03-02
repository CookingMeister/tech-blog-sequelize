const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt');

//  Passport-local Strategy
passport.use(
  new LocalStrategy(
    {
      username: 'username',
      password: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });

        const isPasswordValid =
          user && (await bcrypt.compare(password, user.password));

        return !user
          ? done(null, false, { message: 'Incorrect username.' })
          : !isPasswordValid
          ? done(null, false, { message: 'Incorrect password.' })
          : done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize data
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
