const db = require('../db/queries');
const bcrypt = require('bcryptjs');

async function getSignUpPage(req, res, next) {
  res.render('sign-up');
}

async function createUser(req, res, next) {
  try {
    const {username, email, password} = req.body;
    console.log(username, email, password)

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      // if err, do something
      if (err) {
          console.log('error happened hashing')
      } else {
          // otherwise, store hashedPassword in DB
          const user = await db.addUser(username, email, hashedPassword)
          console.log(user);
          console.log('password hashed');
      }
    });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getSignUpPage,
  createUser
}