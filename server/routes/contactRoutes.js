import { Router } from 'express';
import Contact from '../controllers/contact'
import auth from '../middlewares/auth';
const router = Router();

router.get('/list', auth,Contact.index)
router.post('/add', auth,Contact.add)
router.put('/edit/:id', auth,Contact.edit)
router.get('/view/:id', auth,Contact.view)
router.delete('/delete/:id', auth,Contact.deleteData)
router.post('/deletemany', auth,Contact.deleteMany)


export default router