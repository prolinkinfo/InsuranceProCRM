import { Router } from 'express';
import Tasks from '../controllers/tasks';
import auth from '../middlewares/auth';
const router = Router();

router.get('/list', auth,Tasks.index)
router.post('/add', auth,Tasks.add)
router.get('/view/:id', auth,Tasks.view)
router.put('/edit/:id', auth,Tasks.edit)
router.delete('/delete/:id', auth,Tasks.deleteData)
router.post('/deletemany', auth,Tasks.deleteMany)


export default router