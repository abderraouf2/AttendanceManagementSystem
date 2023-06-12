"use client";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { getAreas, deleteArea } from "@/lib/manageAreas";
import { FiRefreshCw, FiTrash } from "react-icons/fi";
import styles from "../employees/employees.module.css";
import cls from "classnames";

export default function Areas(props) {
  const search = props.search ? props.search : "";
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    console.log(search);
  });
  const refresh = () => {
    setLoading(true);
    getAreas().then((Areas) => {
      setAreas(Areas);
      setLoading(false);
    });
  };
  const deleteAreaById = async (id) => {
    await deleteArea(id).then(() => {
      refresh();
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
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th colSpan={2}>id</th>
              <th colSpan={2}>Area code</th>
              <th colSpan={6}>Area Name</th>
              <th colSpan={2}>actions</th>
            </tr>
          </thead>
          <tbody>
            {areas?.length > 0 &&
              areas
                .filter((area) => area.area_name.toLowerCase().includes(search))
                .map((area) => (
                  <tr key={area.area_code}>
                    <td colSpan={2}>{area.id}</td>
                    <td colSpan={2}>{area.area_code}</td>
                    <td colSpan={6} style={{ textAlign: "left" }}>
                      {area.area_name}
                    </td>
                    <td colSpan={2}>
                      <FiTrash
                        onClick={() => deleteAreaById(area.id)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
