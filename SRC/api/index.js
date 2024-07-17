import express from 'express';
import { AuthRoute } from './Auth/index.js';
import {UsersRoute} from './Users/index.js';

const router = express.Router();

router.use('/Auth', AuthRoute);
router.use('/User',UsersRoute);


export default router;