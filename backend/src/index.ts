import express from 'express';
import dotenv from 'dotenv';
import db from './config/db';
import authRouter from './routes/authRouter';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(express.json()); 
db();

app.use('/auth',authRouter)

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
