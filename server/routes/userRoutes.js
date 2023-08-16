import { Router } from 'express';
import Users from '../controllers/users';
const router = Router();

router.get('/list', Users.index)
router.get('/view/:id', Users.view)
router.put('/edit/:id', Users.edit)
router.delete('/delete/:id', Users.deleteData)
router.post('/register', Users.register)
router.post('/login', Users.login)

export default router