import express from 'express';
import UsersController from './Users.controller';
import verify from '../../middleware/verify.middleware';

const route = express.Router();



route.get('/Poll',verify,UsersController.GetPollByUserID);
route.get('/Poll/:PollID',verify,UsersController.GetPollByID);
route.post('/Poll/Create', verify, UsersController.CreatePoll);
route.post('/Poll/Update',verify,UsersController.UpdatePoll);
route.delete('/Poll/:PollID',verify, UsersController.DeletePoll);

route.get('/Option',verify, UsersController.GetOption);
route.post('/Option/Create' ,verify, UsersController.CreateOption);

route.post('/Vote',verify, UsersController.CreateVote);
route.delete('/Vote',verify, UsersController.DeleteVote);

export default route;