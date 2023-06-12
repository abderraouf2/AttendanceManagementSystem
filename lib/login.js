'use server'
import { cookies } from "next/headers";
import { getXataClient } from "@/src/xata";
import jwt from "jsonwebtoken";

export const setCookieOnLogin = async (username) => {
  const xata = getXataClient();
  const users = await xata.db.users.getMany();

  const user = users.filter((user) => user.username === username);
  const token = jwt.sign(
    {
      issuer: `${username}`,
      name: `${user.username}`,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
    },
    process.env.JWT_SECRET
  );
  const maxAge = 60 * 60 * 24 * 3;
  const cookie = new cookies();
  cookie.set({
    name: "token",
    value: `${token}`,
    maxAge: 60 * 60 * 24 * 3,
    expires: new Date(Date.now() + maxAge * 1000),
  });
};

export const checkIsNewUser = async (username) => {
  const xata = getXataClient();
  const users = await xata.db.users.getMany();
  const isNewUser = users.filter((user) => user.UID === UID);
  return isNewUser.length == 0 ? true : false;
};

export const loginUser = async ( username, password ) => {
  // const redirect = Redirect()
  const xata = getXataClient();
  const users = await xata.db.users.getMany();
  const isNewUser = users.filter((user) => user.username === username && user.password === password);
  if (isNewUser.length > 0) {
  await setCookieOnLogin(username);
  return isNewUser;
  }
  else {
    console.log('user not found');
  }
};

export const logout = async () => {
  const cookie = cookies();
  cookie.delete('token');
};


