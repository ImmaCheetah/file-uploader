const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

const alphaErr = "must contain only letters and numbers";
const lengthErr = "must contain between 1 and 30 characters";
const emailErr = "must be in correct format";

const validateUser = [
  body("username")
    .trim()
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Username ${lengthErr}`),
  body("email")
    .trim()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Email ${lengthErr}`)
    .custom(async (value) => {
      const user = await db.findUserByEmail(value);
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password needs: \n - 8 characters \n - 1 capital letter \n - 1 number \n - 1 special character",
    )
    .isLength({ min: 1, max: 30 }),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords don't match`),
];

async function getSignUpPage(req, res, next) {
  res.render("sign-up");
}

async function createUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const errors = validationResult(req);

    // check for errors and render page
    // with errors and name fields
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        param: req.params,
        title: "Sign Up",
        username: username,
        email: email,
        errors: errors.array(),
      });
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      // if err, do something
      if (err) {
        console.log("error happened hashing");
      } else {
        // otherwise, store hashedPassword in DB
        const user = await db.addUser(username, email, hashedPassword);
        console.log(user);
        console.log("password hashed");
      }
    });
    res.redirect("/login");
  } catch (error) {
    next(new Error("Failed to create user"));
  }
}

module.exports = {
  getSignUpPage,
  createUser,
  validateUser,
};
