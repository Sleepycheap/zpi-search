// import { resolveInclude } from 'ejs';
import { search } from '../utils/egnyte.js';

export async function searchResults(req, res) {
  // const r = req;
  const params = {
    type: req.body.type,
    operator: req.body.operator,
    folder: req.body.folder,
  };
  // const sParams = new URLSearchParams(params).toString();
  const { query } = req.body;
  const results = await search(query, params);
  console.log('Result', results);
  res.render('showResults', {
    results: results,
  });
}

export async function showResults(req, res) {
  res.render('showResults.ejs', {
    // results: results,
  });
}
