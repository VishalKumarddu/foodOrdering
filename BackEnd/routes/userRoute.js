const express = require('express');
const { loginUser, registerUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post("/register",registerUser);    //localhost:9000/api/user/register

userRouter.post("/login",loginUser);         //localhost:9000/api/user/login

module.exports = userRouter;