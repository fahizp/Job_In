import express from 'express';
import { homeSearch } from '../controllers/homeController';
const router = express.Router();


router.get('/homesearch',homeSearch)

export default router;