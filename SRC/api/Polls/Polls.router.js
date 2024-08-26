import express from 'express';
import PollsController from './Polls.controller';
import verify from '../../middleware/verify.middleware';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

route.get('',verify,PollsController.GetPollByUserID);
route.get('/:PollID',PollsController.GetPollByID);
route.post('/Create', verify,validateMiddleware.validatePoll, PollsController.CreatePoll);
route.post('/Update',verify,validateMiddleware.validateUpdatePoll, PollsController.UpdatePoll);
route.delete('/:PollID',verify, PollsController.DeletePoll);

export default route;