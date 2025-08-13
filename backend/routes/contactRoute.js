import express from 'express';
import { saveContactForm } from '../controllers/contactController.js';

const contactRouter = express.Router();

// POST /api/contact
contactRouter.post('/', saveContactForm);

export default contactRouter;