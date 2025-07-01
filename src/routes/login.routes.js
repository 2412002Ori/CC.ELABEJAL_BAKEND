import { Router } from 'express';
import { login } from '../controlers/login.controlers.js';

const router = Router();

router.post('/login', login);

export default router;