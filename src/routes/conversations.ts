import express, {Request, Response} from 'express';
import * as conversationController from '../controllers/conversations';
import { authenticator } from '../middleware/auth';

const router = express.Router();

router.post('/convo', authenticator, async (req: Request, res: Response) => {
    await conversationController.createConversation(req, res);
});

router.get('/convo/:user_id', authenticator, async (req: Request, res: Response) => {
    await conversationController.getConversationsByUserId(req, res);
});

router.get('/convo/:id', authenticator, async (req: Request, res: Response) => {
    await conversationController.getConversationById(req, res);
});

router.delete('/convo/:id', authenticator, async (req: Request, res: Response) => {
    await conversationController.deleteConversationById(req, res);
});

export default router;