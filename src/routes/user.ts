import express from 'express';
import controller from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/user/login', controller.loginUser);

userRouter.get('/user', controller.isUserAuthenticated, controller.getUserInfo);

userRouter.get('/users', controller.isUserAuthenticated, controller.getUsers);

userRouter.post('/user/transaction', controller.isUserAuthenticated, controller.transferMoney);

userRouter.get('/user/transactions', controller.isUserAuthenticated, controller.getUserTransactions);

export = userRouter;
