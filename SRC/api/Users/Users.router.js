import express from 'express';
import UsersController from './Users.controller';
import verify from '../../middleware/verify.middleware';

const route = express.Router();

route.post('/CreatePool', verify, UsersController.CreatePoll);

export default route;