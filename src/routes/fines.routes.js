import { Router } from 'express';
import { getAllFines, getFineById, postFine } from '../controlers/fines.controlers.js';

const router = Router();

router.get('/fines', getAllFines);
router.get('/fines/:id', getFineById);
router.post('/fines', postFine);

export default router; 