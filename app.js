require('dotenv').config();

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

const db = require('./db/queries');

const express = require('express');
const passport = require('passport');
const path = require("node:path");

// Prisma session store packages
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Path to public folder
const assetsPath = path.join(__dirname, "/public");

// Routers
const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const signUpRouter = require('./routes/signUpRouter');
const folderRouter = require('./routes/folderRouter');
const fileRouter = require('./routes/fileRouter');

async function fetchFolders(req, res, next) {
  const folders = await db.getAllFolders();
  res.locals.folders = folders;
  next();
}

app.use(fetchFolders);

app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
})

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/sign-up", signUpRouter);
app.use("/folder", folderRouter);
app.use("/file", fileRouter);

app.listen(process.env.PORT, () => console.log('App running on port', PORT));

