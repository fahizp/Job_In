import express  from 'express'
import dotenv from 'dotenv'
import db from './config/db';
dotenv.config();

const app = express();
db();
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


