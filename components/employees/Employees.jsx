"use client";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getEmployees } from "@/lib/manageEmployees";
import { Spinner } from "react-bootstrap";
import DeleteEmployee from "./DeleteEmployee";
import EditEmployee from "./EditEmployee";
import EmployeeDetails from "./EmployeeDetails";
export default function Employees(props) {
  const search = props.search ? props.search : "";
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const refresh = () => {
    getEmployees().then((response) => {
      setEmployees(response.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    refresh();
  }, []);

  return loading ? (
    <>
      <Spinner animation="border" />
    </>
  ) : (
    <div className=" w-[90vw] h-[550px] border-2 border-black mt-[5vh] ">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Hire date</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.length > 0 &&
            employees
              .filter((employee) =>
                employee.first_name.toLowerCase().includes(search)
              )
              .map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.hire_date}</td>
                  <td className=" w-[100%] flex flex-row justify-around ">
                    <DeleteEmployee
                      id={employee.id}
                      onChange={() => refresh()}
                    />
                    <EditEmployee employee={employee} />
                    <EmployeeDetails employee={employee} />
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}
