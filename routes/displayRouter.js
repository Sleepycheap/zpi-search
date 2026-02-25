import express from 'express';
import { displayPage } from '../controllers/displayController.js';

const displayRouter = express.Router();

displayRouter.get('/', displayPage);

export default displayRouter;
