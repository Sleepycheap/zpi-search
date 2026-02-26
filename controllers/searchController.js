import { search, createLink } from '../utils/egnyte.js';

export async function searchResults(req, res) {
  const params = {
    type: req.body.type,
    operator: req.body.operator,
    folder: '/Shared/' + req.body.folder,
  };
  const { query } = req.body;
  console.log(`query`, query);
  console.log('params', params);
  const results = await search(query, params);
  console.log('Result', results);
  res.render('showResults', {
    results: results,
  });
}

export async function showResults(req, res) {
  res.render('showResults.ejs', {
    results: results,
  });
}
