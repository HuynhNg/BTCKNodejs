import express from 'express';
import OptionController from './Options.controller';
import verify from '../../middleware/verify.middleware';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

route.get('', OptionController.GetOption);
route.post('/Create',verify,validateMiddleware.validateOption,OptionController.CreateOption);

export default route;
