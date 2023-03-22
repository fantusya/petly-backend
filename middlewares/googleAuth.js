const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL:
    "https://uninterested-hose-newt.cyclic.app/api/users/google/callback",
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const user = User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = bcrypt.hash(v4(), 10);
    const newUser = User.create({ email, password, name: displayName });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
