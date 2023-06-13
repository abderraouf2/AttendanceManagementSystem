"use client";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { getDepartments, deleteDepatment } from "@/lib/manageDepartments";
import { FiRefreshCw, FiTrash } from "react-icons/fi";
import styles from "../employees/employees.module.css";
import cls from "classnames";
import DeleteDepartment from "./DeleteDepartment";
export default function Departments(props) {
  var search = props.search ? props.search : "";
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  const refresh = () => {
    setLoading(true);
    getDepartments().then((departments) => {
      setDepartments(departments);
      setLoading(false);
    });
  };
  const deleteDeptById = async (id) => {
    await deleteDepatment(id).then(() => {
      refresh();
    });
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className=" w-[90vw] h-[550px] mt-[1vh] ">
      <div className=" w-[100%] flex justify-end mb-[10px] ">
        <Button
          className={cls(styles.btn, " w-[10%] flex flex-row ")}
          onClick={() => refresh()}
          variant="primary"
        >
          <FiRefreshCw /> Refresh
        </Button>
      </div>
      <div className=" w-[90vw] h-[530px] border-2 border-black overflow-scroll ">
        {loading ? (
          <div className=" h-[100%] w-[100%] flex justify-center items-center ">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th colSpan={2}>id</th>
                <th colSpan={2}>Department code</th>
                <th colSpan={5}>Department Name</th>
                <th colSpan={3}>actions</th>
              </tr>
            </thead>
            <tbody>
              {departments?.length > 0 &&
                departments
                  .filter((department) =>
                    department.dept_name.toLowerCase().includes(search)
                  )
                  .map((department) => (
                    <tr key={department.dept_code}>
                      <td colSpan={2}>{department.id}</td>
                      <td colSpan={2}>{department.dept_code}</td>
                      <td colSpan={5} style={{ textAlign: "left" }}>
                        {department.dept_name}
                      </td>
                      <td colSpan={3}>
                        <DeleteDepartment
                          id={department.id}
                          onChange={() => refresh()}
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
