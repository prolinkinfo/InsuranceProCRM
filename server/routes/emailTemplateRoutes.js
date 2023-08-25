import { Router } from 'express';
import emailTemplate from '../controllers/emailTemplate';
const router = Router();

router.get('/list', emailTemplate.index)
router.post('/add', emailTemplate.add)
router.get('/view/:id', emailTemplate.view)
router.put('/edit/:id', emailTemplate.edit)
router.delete('/delete/:id', emailTemplate.deleteData)
router.post('/deletemanny', emailTemplate.deleteMany)


export default router