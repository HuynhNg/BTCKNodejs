import express from 'express';
import { AuthRoute } from './Auth/index.js';
import {UserRoute} from './Users/index.js';

const router = express.Router();

router.use('/Auth', AuthRoute);
router.use('/User',UserRoute);


export default router;