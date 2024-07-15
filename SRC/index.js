import express from 'express';
import routers from './api/index';
// import logger from 'morgan';
const app = express();

app.use(express.json());

app.use('/', routers);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log(logger);
  console.log(`Server listening on port ${port}`);
});