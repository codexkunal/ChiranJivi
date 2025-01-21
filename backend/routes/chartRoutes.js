import express from 'express';
import { fetchGraphData } from '../controllers/chartController.js';

const chartRouter = express.Router();

// Route to fetch graph data
chartRouter.post('/graph', fetchGraphData);

export default chartRouter;
