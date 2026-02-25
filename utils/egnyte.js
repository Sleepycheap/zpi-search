import express from 'express';
import axios from 'axios';
import 'dotenv/config.js';

const headers = {
  Authorization: `Bearer ${process.env.TOKEN}`,
};

const url1 = 'https://splashtacular.egnyte.com/pubapi/v1';
const url2 = 'https://splashtacular.egnyte.com/pubapi/v2';

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
      console.log('R:', r.data);
    }
    // console.log(folders);
  } catch (err) {
    console.error(err);
  }
}

export async function search(query, params = 'undefined') {
  try {
    const searchParams = new URLSearchParams(params).toString();
    const url = `${url1}/search?query=${query}&${searchParams}`;
    const req = await axios.get(url, { headers });
    // console.log('Result:', req.data);
    const { results } = req.data;
    return results;
    // console.log('results:', results);
    // for (const i of results) {
    //   const { name } = i;
    //   const { path } = i;
    //   console.log('Results:', i);
    // }
  } catch (err) {
    console.error(err);
  }
}

// getFolders('ProjectsTest');
// search('Florida');

async function searchTest(query, params = 'undefined') {
  // const params = { count: 1, type: 'folder' };
  const searchParams = new URLSearchParams(params).toString();
  const url = `${url1}/search?query=${query}&${searchParams}`;
  const res = await axios.get(url, { headers });
  console.log(res.data);
}

// searchTest('Florida', { count: 1, type: 'folder' });
