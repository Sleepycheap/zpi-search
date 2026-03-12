import express from "express";
import axios from "axios";
import fs from "node:fs";
import "dotenv/config.js";

const headers = {
  Authorization: `Bearer ${process.env.DEV_TOKEN}`,
};

const prod_headers = {
  Authorization: `Bearer ${process.env.PROD_TOKEN}`,
};

const url1 = "https://splashtacular.egnyte.com/pubapi/v1";
const url2 = "https://splashtacular.egnyte.com/pubapi/v2";

export async function getFolders(root) {
  try {
    const url = `${process.env.URL}/v1/fs/Shared/${root}`;
    const req = await axios.get(url, {
      headers,
    });
    const { folders } = req.data;
    for (const i of folders) {
      const { name } = i;
      const { path } = i;
      const u = `${process.env.URL}/v1/fs${path}`;
      const r = await axios.get(u, {
        headers: headers,
      });
      console.log("R:", r.data);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function search(query, params = "undefined", offset = 0) {
  try {
    const searchParams = new URLSearchParams(params).toString();
    const url = `${url1}/search?query=${query}&${searchParams}&offset=${offset}`;
    const req = await axios.get(url, { headers: prod_headers });
    const { data } = req;
    const { results } = req.data;
    const { hasMore } = req.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function searchTest(query, params = "undefined") {
  const searchParams = new URLSearchParams(params).toString();
  const url = `${url1}/search?query=${query}&${searchParams}`;
  const res = await axios.get(url, { headers });
  console.log(res.data);
}

export async function createLink(testResults) {
  let links = [];
  console.log("test", testResults);
  for (const i of testResults) {
    const { path } = i;
    const isFile = (i.is_folder = false ? "folder" : "file");
    try {
      const body = {
        path,
        file: isFile,
        accessibility: "password",
      };
      console.log("body", body);
      const url = `${url1}/links`;
      const file = await axios.post(url, body, { headers });
      const { data } = file;
      const link = data.links[0].url;
      links.push(link);
      console.log(`links`, links);
    } catch (err) {
      console.error(err);
    }
  }
}

export async function getLocks(path) {
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
