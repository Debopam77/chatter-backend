import express, {Request, Response} from 'express';
import * as messageController from '../controllers/messages';
//const authenticator = require('../middleware/auth');
import { authenticator } from '../middleware/auth';

const router = express.Router();

router.post('/message', authenticator, async (req: Request, res: Response) => {
    console.log(req);
    await messageController.createMessage(req, res);
});

router.get('/message/:conversationId', authenticator, async (req: Request, res: Response) => {
    await messageController.getMessages(req, res);
});

router.delete('/message/:id', authenticator, async (req: Request, res: Response) => {
    await messageController.deleteMessage(req, res);
});

export default router;