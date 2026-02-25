import express from 'express';
import { searchResults, showResults } from '../controllers/searchController.js';

const searchRouter = express.Router();

searchRouter.post('/', searchResults);
// searchRouter.get('/showResults', showResults);

export default searchRouter;
