import { Router } from 'express';
const router = Router();
import searchControllers from '../controllers/search.controllers.js';

router.post('/', searchControllers.searchpattern);

export default router;
