import express from 'express';
import VotesController from './Votes.controller';
import verify from '../../middleware/verify.middleware';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

route.post('',verify,validateMiddleware.validateVote, VotesController.CreateVote);
route.delete('',verify, VotesController.DeleteVote);

export default route;