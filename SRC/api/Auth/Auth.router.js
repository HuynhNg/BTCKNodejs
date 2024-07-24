import express from 'express';
import AuthController from './Auth.controller';
import validateMiddleware from '../../middleware/validate.middleware';

const route = express.Router();

route.post('/Register',validateMiddleware.validateResgister, AuthController.Register);
route.post('/Login',AuthController.Login);
route.post('/ForgetPassword',validateMiddleware.validateForgetPassword, AuthController.ForgetPassword);
route.post('/ResetPassword',AuthController.ResetPassword);

export default route;