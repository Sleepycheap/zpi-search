import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import { appendFile } from 'node:fs';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { getUser, createUser } from './userDB.js';

import displayRouter from './routes/displayRouter.js';
import searchRouter from './routes/searchRouter.js';
import { searchResults } from './controllers/searchController.js';

const dirname = fileURLToPath(new URL('.', import.meta.url));
const filePath = join(dirname, 'views');
const assetsPath = join(dirname, 'public');
const utilPath = join(dirname, 'utils');

const app = express();

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set('views', filePath);
app.set('view engine', 'ejs');
app.use(session({ secret: 'otter', resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = getUser(username);
      console.log('user', user);

      if (!user) {
        return done(null, false, { message: 'Incorrect Username' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect Password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  try {
    const user = getUser(username);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login-error',
  }),
);

app.get('/register', (req, res) => res.render('sign-up-form'));

app.post(
  '/register',
  body('username')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Username must be at least 6 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('passwordConfirmation')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('password do not match'),
  async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (errors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        createUser(req.body.username, hashedPassword);
        res.redirect('/');
      } else {
        const array = errors.errors;
        res.render('error', { array: array }, (err, ejs) => {
          res.send(ejs);
        });
      }
    } catch (err) {
      return next(err);
    }
  },
);

app.get('/error', (req, res) => res.render('error'));

app.get('/login-error', (req, res) => res.render('login-error'));

const port = 8000;

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`ZPI Search running on port: ${port}`);
});

app.use('/', displayRouter);
app.use('/search', searchRouter);
