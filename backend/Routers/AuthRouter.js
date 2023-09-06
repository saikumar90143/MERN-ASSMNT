import express from 'express'
import { SignUp, SignIn } from "../controllers/AuthController.js";
import verifyToken from '../middleware/VerifyToken.js';

const router = express.Router()

// signup
router.post('/signup', SignUp)

// signin

router.post('/signin', SignIn)


export default router