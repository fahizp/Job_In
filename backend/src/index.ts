import express  from 'express'
import dotenv from 'dotenv'
import db from './config/db';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter';

dotenv.config();

const app = express();
app.use(bodyParser.json());
db();
  
app.use('/auth',authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})




