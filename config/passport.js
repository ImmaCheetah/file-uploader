const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const verifyCallback = async (username, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    });
    console.log(user)
    
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (match) {
      console.log('passwords matched');
      return done(null, user);
    } else {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" })
    }
    
  } catch (error) {
    return done(error);
  }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirst({ where: { id } });

    done(null, user)
  } catch (error) {
    done(error)
  }
});
