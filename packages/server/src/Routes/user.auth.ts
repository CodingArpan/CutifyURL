import express from 'express'
import validation from '../Middlewares/datavalidation';
import authenticate from '../Controllers/auth.controller';
const router = express.Router();

router.post('/signup', validation.userregistration, authenticate.registration)
router.post('/checkemail', authenticate.emailstatus)
router.post('/signin',validation.usersignin, authenticate.login)

export default router;