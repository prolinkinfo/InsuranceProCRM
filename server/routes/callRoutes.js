import { Router } from 'express';
import Calls from '../controllers/calls';
import auth from '../middlewares/auth'
const router = Router();

router.get('/list',auth, Calls.index)
router.post('/add', auth,Calls.add)
router.get('/view/:id', auth,Calls.view)
router.put('/edit/:id', auth,Calls.edit)
router.delete('/delete/:id', auth,Calls.deleteData)
router.post('/deletemany', auth,Calls.deleteMany)


export default router