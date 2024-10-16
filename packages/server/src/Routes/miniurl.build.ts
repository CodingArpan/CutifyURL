import express from 'express'
import miniurl from '../Controllers/miniurl.controller';
import validation from '../Middlewares/datavalidation';
import utility from '../Middlewares/utility'

const router = express.Router();

router.post('/availkeyword', miniurl.validatekeyword)

router.post('/short', utility.verifyAuthTokenOptional, validation.shorturlrequest, miniurl.createShortUrl)

router.post('/getall', utility.verifyAuthTokenOptional, miniurl.getUrlData);







export default router;