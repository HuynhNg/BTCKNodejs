import express from 'express';
import UsersController from './Users.controller';
import verify from '../../middleware/verify.middleware';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();



route.get('/Poll',verify,UsersController.GetPollByUserID);
route.get('/Poll/:PollID',verify,UsersController.GetPollByID);
route.post('/Poll/Create', verify,validateMiddleware.validatePoll, UsersController.CreatePoll);
route.post('/Poll/Update',verify,validateMiddleware.validateUpdatePoll, UsersController.UpdatePoll);
route.delete('/Poll/:PollID',verify, UsersController.DeletePoll);

route.get('/Option',verify, UsersController.GetOption);
route.post('/Option/Create' ,verify,validateMiddleware.validateOption, UsersController.CreateOption);

route.post('/Vote',verify,validateMiddleware.validateVote, UsersController.CreateVote);
route.delete('/Vote',verify, UsersController.DeleteVote);

export default route;