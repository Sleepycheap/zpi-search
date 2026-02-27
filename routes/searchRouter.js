import express from 'express';
import { searchResults } from '../controllers/searchController.js';

const searchRouter = express.Router();

searchRouter.post('/', searchResults);

export default searchRouter;
