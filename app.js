import express from 'express';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import { appendFile } from 'node:fs';
import displayRouter from './routes/displayRouter.js';
import searchRouter from './routes/searchRouter.js';
import { searchResults } from './controllers/searchController.js';

const dirname = fileURLToPath(new URL('.', import.meta.url));
const filePath = join(dirname, 'views');
const assetsPath = join(dirname, 'public');
const utilPath = join(dirname, 'utils');

const app = express();

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set('views', filePath);
app.set('view engine', 'ejs');

const port = 8000;

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`ZPI Search running on port: ${port}`);
});

app.use('/', displayRouter);
app.use('/search', searchRouter);
