import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path';
import fs from 'fs';

const users = [
  {
    username: 'Admin',
    password: await bcrypt.hash('password', 10),
  },
  {
    username: 'James',
    password: 'ffdfffafdf',
  },
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

export async function loginUser(username, password) {
  const user = users.find((user) => user.username === username);
  const pass = user.password;
  if (user && pass === password) {
    console.log('Logging in...');
    return true;
  } else if (user && pass !== password) {
    throw new Error('Password is incorrect');
  } else if (!user) {
    console.log('User does not exist');
  }
}
