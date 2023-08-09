import express from 'express'
import miniurl from '../Controllers/miniurl.controller';
import validation from '../Middlewares/datavalidation';
import utility from '../Middlewares/utility'

const router = express.Router();

router.get('/avail/:keyword', miniurl.validatekeyword)

router.post('/short', utility.verifyauthtoken_optional, validation.shorturlrequest, miniurl.createShortUrl)





export default router;