import { search } from "../utils/egnyte.js";
import { stripName } from "../utils/stripName.js";
import "dotenv/config";

export async function searchResults(req, res) {
  const params = {
    type: req.body.type,
    operator: req.body.operator,
    folder: "/Shared/" + req.body.folder,
    snippet_requested: false,
    page: parseInt(req.body.page || 1),
    limit: 20,
  };
  const { page, limit } = params;
  // const  = (params.page - 1) * limit;
  const offset = (page - 1) * limit;
  const endIndex = page * limit;
  const { query } = req.body;
  const results = {};
  // let hasMore = "";

  results.next = {
    page: page + 1,
    limit,
  };

  if (offset > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  results.data = await search(query, params, offset);
  console.log(results);
  // console.log(results.previous);
  res.render("showResults", {
    query,
    data: results.data,
    results,
  });
}
