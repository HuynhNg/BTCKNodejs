import express from 'express';
import { AuthRoute } from './Auth/index.js';
import { PollsRoute} from './Polls/index.js';
import { OptionsRoute} from './Options/index.js';
import { VotesRoute} from './Votes/index.js';

const router = express.Router();

router.use('/Auth', AuthRoute);
router.use('/User/Poll',PollsRoute);
router.use('/User/Option',OptionsRoute);
router.use('/User/Vote',VotesRoute)


export default router;