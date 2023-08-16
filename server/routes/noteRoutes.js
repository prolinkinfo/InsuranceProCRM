import { Router } from 'express';
import Notes from '../controllers/notes'
import auth from '../middlewares/auth';
const router = Router();

router.get('/list', auth,Notes.index)
router.post('/add', auth,Notes.add)
router.get('/view/:id', auth,Notes.view)
router.put('/edit/:id', auth,Notes.edit)
router.delete('/delete/:id', auth,Notes.deleteData)


export default router