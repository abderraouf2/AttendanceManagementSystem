"use server";
import { getToken } from "./main";

export const getDepartments = async () => {
    const token = await getToken();
    const response = await fetch(
      "http://20.127.184.47:8081/personnel/api/departments/",
      {
        method: "GET",
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.token}`,
        }
      }
    );
    const json = await response.json();
    return json.data;
}

export const createDepartment = async (code, name) => {
  const token = await getToken();
  const response = await fetch(
    "http://20.127.184.47:8081/personnel/api/departments/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
      body: JSON.stringify({
        dept_code: `${code}`,
        dept_name: `${name}`,
        parent_Department: null,
      }),
    }
  );
  const json = await response.json();
  return json.data;
};

export const deleteDepatment = async (id) => {
    const token = await getToken();
    const response = await fetch(
      `http://20.127.184.47:8081/personnel/api/departments/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token.token}`,
        },
      }
    );
  };
