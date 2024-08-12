import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import db from './config/db';
import authRouter from './routes/authRouter';
import './controllers/googleauthController';

const app = express();
db();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
