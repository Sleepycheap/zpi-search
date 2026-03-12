import axios from "axios";
import "dotenv/config";

const prod_headers = {
  Authorization: `Bearer ${process.env.PROD_TOKEN}`,
};

const headers = {
  Authorization: `Bearer ${process.env.DEV_TOKEN}`,
};
// const testString = "Manchester, MO";

function addQuotes(string) {
  const newString = '"' + string + '"';
  console.log(newString);
}

// addQuotes("Manchester, MO");

async function getLocks(path) {
  const url = `https://splashtacular.egnyte.com/pubapi/v1/fs${path}?include_locks=true`;
  const req = await axios.get(url, { headers: prod_headers });
  const { uploaded_by, last_modified, lock_info } = req.data;
  const displayName = lock_info.first_name + " " + lock_info.last_name;
  const lockObj = {
    Locked_by: displayName,
    uploaded_by,
    last_modified,
  };
  return lockObj;
}

console.log(
  await getLocks(
    "/Shared/Projectstest/Austin, TX - Dell JCC - 10621 & 30621/1. Bid Docs/131100_-_SWIMMING_POOLS.pdf",
  ),
);
