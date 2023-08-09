import express from 'express'
import redirection from '../Controllers/redirect.controller'
import validation from '../Middlewares/datavalidation';
const router = express.Router();

router.post('/data', validation.userredirectdata, redirection.redirectdatacollection)

router.post('/pathid', redirection.handelRedirect)

router.post('/protection', redirection.redirectpasswordvalidation)

export default router;