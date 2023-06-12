"use server";
import { getToken } from "./main";

export const getAreas = async () => {
  const token = await getToken();
  const response = await fetch(
    "http://20.127.184.47:8081/personnel/api/areas/",
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
    }
  );
  const json = await response.json();
  return json.data;
};

export const createArea = async (code, name) => {
  const token = await getToken();
  const response = await fetch(
    "http://20.127.184.47:8081/personnel/api/areas/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
      body: JSON.stringify({
        area_code: `${code}`,
        area_name: `${name}`,
        parent_area: null,
      }),
    }
  );
  const json = await response.json();
  return json.data;
};

export const deleteArea = async (id) => {
  const token = await getToken();
  const response = await fetch(
    `http://20.127.184.47:8081/personnel/api/areas/${id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
    }
  );
};
