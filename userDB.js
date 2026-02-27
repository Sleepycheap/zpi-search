import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path';
import fs from 'fs';

const users = [
  // {
  //   username: 'Anthony',
  //   password: '',
  // },
  // {
  //   username: 'James',
  //   password: 'ffdfffafdf',
  // },
];

export function getUsersTest() {
  return test;
}

export function getUser(username) {
  const user = users.find((user) => user.username === username);
  return user;
}

export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  console.log(users);
}

// function loginUser(username) {
//   const user = users.find((user) => user.username === username);

//   if (!user) {
//     console.log('User doesnt exist');
//   } else {
//     console.log('Logging in...');
//   }
//  }
