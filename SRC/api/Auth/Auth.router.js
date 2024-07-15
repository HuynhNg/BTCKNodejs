import express from 'express';
import AuthController from './Auth.controller';

const route = express.Router();

route.post('/Register', AuthController.Register);
route.post('/Login',AuthController.Login);
route.post('/ForgetPassword', AuthController.ForgetPassword);
route.post('/ResetPassword',AuthController.ResetPassword);

export default route;