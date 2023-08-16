import { Router } from 'express';
import Meetings from '../controllers/meetings';
import auth from '../middlewares/auth';
const router = Router();

router.get('/list', auth,Meetings.index)
router.post('/add', auth,Meetings.add)
router.get('/view/:id', auth,Meetings.view)
router.put('/edit/:id', auth,Meetings.edit)
router.delete('/delete/:id', auth,Meetings.deleteData)
router.post('/deletemany', auth,Meetings.deleteMany)


export default router