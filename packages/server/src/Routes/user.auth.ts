import express from 'express'
import validation from '../Middlewares/datavalidation';
import authenticate from '../Controllers/auth.controller';
const router = express.Router();

router.post('/signup', validation.userregistration, authenticate.registration)
router.post('/checkaccesstoken', authenticate.accessToken)
router.post('/signin', validation.usersignin, authenticate.login)
router.post('/logout', authenticate.logout)

export default router;