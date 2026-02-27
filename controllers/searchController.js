import { search } from '../utils/egnyte.js';
import { stripName } from '../utils/stripName.js';

export async function searchResults(req, res) {
  const params = {
    type: req.body.type,
    operator: req.body.operator,
    folder: '/Shared/' + req.body.folder,
  };
  const { query } = req.body;
  const results = await search(query, params);
  console.log('Result', results);
  res.render('showResults', {
    query,
    results,
  });
}
