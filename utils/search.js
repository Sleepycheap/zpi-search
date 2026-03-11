import express from "express";
import axios from "axios";
import fs from "node:fs";
import "dotenv/config.js";
import path from "path";
import { search } from "./egnyte.js";

const headers = {
  Authorization: `Bearer ${process.env.PROD_TOKEN}`,
};

export async function getAllResults(query, params) {
  let allData = [];
  let offset = 0;
  const limit = 20;
  const searchParams = new URLSearchParams(params).toString();
  let moreDataAvailable = true;
  while (moreDataAvailable) {
    try {
      const url = `https://splashtacular.egnyte.com/pubapi/v1/search?query=${query}&${searchParams}&offset=${offset}`;
      const req = await axios.get(url, { headers });
      const { data } = req;
      const { results, hasMore } = req.data;
      const newOffset = req.data.offset;
      const currentItems = results;
      allData.push(...currentItems);
      if (!hasMore) {
        moreDataAvailable = false;
      } else {
        offset = newOffset;
      }
    } catch (error) {
      console.error("error", error);
      break;
    }
  }
  const filePath = "allData.json";
  const content = JSON.stringify(allData, null, 5);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("err", err);
    }
  });
  return allData;
}
