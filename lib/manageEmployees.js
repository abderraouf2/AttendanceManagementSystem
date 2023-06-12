"use server";
import { getToken } from "./main";

export const getEmployees = async () => {
  const token = await getToken();
  const response = await fetch(
    "http://20.127.184.47:8081/personnel/api/employees/",
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
  console.log(json);
  return json;
};

export const createEmployee = async (
  name,
  lastName,
  hireDate,
  area,
  dept,
  phone,
  address,
  gender
) => {
  const token = await getToken();
  let id = Math.floor(Math.random() * 100);
  const emp = await getEmployees().then((response) =>
    response.data.find((employee) => employee.emp_code == id)
  );
  if (emp) {
    id = Math.floor(Math.random() * 100);
  }

  const response = await fetch(
    "http://20.127.184.47:8081/personnel/api/employees/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
      body: JSON.stringify({
        emp_code: id,
        first_name: `${name}`,
        last_name: `${lastName}`,
        department: parseInt(dept),
        area: [parseInt(area)],
        hire_date: hireDate,
        gender,
        mobile: `${phone}`,
        address: `${address}`,
      }),
    }
  );
  const json = await response.json();
  console.log({ response });
  return json.data;
};

export const deleteEmployeeById = async (id) => {
  const token = await getToken();
  const response = await fetch(
    `http://20.127.184.47:8081/personnel/api/employees/${id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
    }
  );
};

export const updateEmployee = async (
  id,
  name,
  lastName,
  hireDate,
  area,
  dept,
  phone,
  address,
  gender
) => {
  const token = await getToken();
  const response = await fetch(
    `http://20.127.184.47:8081/personnel/api/employees/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
      body: JSON.stringify({
        id,
        first_name: `${name}`,
        last_name: `${lastName}`,
        department: parseInt(dept),
        area: [parseInt(area)],
        hire_date: hireDate,
        gender,
        mobile: `${phone}`,
        address: `${address}`,
      }),
    }
  );
  const json = await response.json();
  return json.data;
};
