import { search } from "../utils/egnyte.js";
import { stripName } from "../utils/stripName.js";
import { getAllResults } from "../utils/search.js";
import "dotenv/config";

export async function searchResults(req, res) {
  const params = {
    type: req.body.type,
    operator: req.body.operator,
    folder: "/Shared/" + req.body.folder,
    snippet_requested: false,
  };

  const { query } = req.body;

  const response = await getAllResults(query, params);
  console.log("result", response);
  res.render("showResults", {
    query,
    data: response,
  });
}
