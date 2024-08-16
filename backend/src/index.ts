import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import db from './config/db';
import authRouter from './routes/authRouter';
import candidateRouter from './routes/candidateRouter';

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

app.use('/auth', authRouter);
app.use('/candidate',candidateRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
