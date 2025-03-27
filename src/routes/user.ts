import express, {Request, Response} from 'express';
import * as userController from '../controllers/users';
import { authenticator } from '../middleware/auth';

const router = express.Router();

router.post('/user/', async(req: Request, res: Response) => {
    await userController.createUser(req, res);
});

router.post('/user/login', async(req: Request, res: Response) => {
    await userController.login(req, res);
});

router.get('/user', authenticator, async (req: Request, res: Response) => {
    if(req.query?.id) {
        await userController.getUserById(req, res);
    } else if(req.query?.email) {
        await userController.getUserByEmail(req, res);
    }
});

router.put('/user/:id', authenticator, async (req: Request, res: Response)=> {
    await userController.updateUserById(req, res);
});

router.delete('/user/:id', authenticator, async (req: Request, res: Response) => {
    await userController.deleteUserById(req, res);
});

export default router;