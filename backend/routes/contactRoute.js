import express from 'express';
import { saveContactForm, listContactSubmissions } from '../controllers/contactController.js';

const contactRouter = express.Router();

// POST /api/contact
contactRouter.post('/', saveContactForm);
contactRouter.get('/contacts', listContactSubmissions);

export default contactRouter;