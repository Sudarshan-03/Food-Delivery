import express from 'express';
import { submitApplication, listApplications } from '../controllers/applicationController.js';

const applicationRouter = express.Router();

// POST /api/applications
applicationRouter.post('/', submitApplication);
applicationRouter.get('/list', listApplications);
export default applicationRouter; 