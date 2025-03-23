import express, {Request, Response} from 'express';
import * as userController from '../controllers/users';

const router = express.Router();

router.post('/user/', async(req: Request, res: Response) => {
    await userController.createUser(req, res);
});

router.post('/user/login', async(req: Request, res: Response) => {
    await userController.login(req, res);
});

router.get('/user/:id', async (req: Request, res: Response) => {
    await userController.getUserById(req, res);
});

router.put('/user/:id', async (req: Request, res: Response)=> {
    await userController.updateUserById(req, res);
});

router.delete('/user/:id', async (req: Request, res: Response) => {
    await userController.deleteUserById(req, res);
});

export default router;