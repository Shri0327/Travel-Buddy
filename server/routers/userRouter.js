import express from 'express';
import dotenv from 'dotenv';
import auth from '../middlewares/auth.js';
import UserController from '../controllers/userController.js';
dotenv.config();

const uR = express.Router();

const uC = new UserController();

uR.post('/testing', uC.testing);
uR.post('/send-email', uC.sendEmail);
uR.post('/register', uC.register);
uR.post('/login', uC.login);
uR.post('/verify-otp', uC.verifyOtp);
uR.post('/get/chat', auth, uC.getChat);
uR.post('/create/chat', auth, uC.createChat);
uR.post('/get/all-chat', auth, uC.getAllChats);
uR.post('/test/chat', auth, uC.testChat);

export default uR;