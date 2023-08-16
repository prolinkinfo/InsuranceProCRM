import { Router } from 'express';
import Claims from '../controllers/claims'
import auth from '../middlewares/auth';
const router = Router();

router.get('/list', auth,Claims.index)
router.post('/add', auth,Claims.add)
router.get('/view/:id', auth,Claims.view)
router.put('/edit/:id', auth,Claims.edit)
router.delete('/delete/:id', auth,Claims.deleteData)


export default router