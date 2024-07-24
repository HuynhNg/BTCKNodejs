import express from 'express';
import routers from './api/index';
import errorHandler from './middleware/handleError.middleware';
// import logger from 'morgan';
const app = express();

app.use(express.json());

app.use('/', routers);

app.use(errorHandler);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log(logger);
  console.log(`Server listening on port ${port}`);
});