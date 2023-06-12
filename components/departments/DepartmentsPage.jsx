"use client";
import React, { useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import AddDepartment from "./AddDepartment";
import Departments from "./Departments";
export default function DepartmentPage() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className=" h-[10vh] w-[90vw] mt-[5vh] flex flex-row justify-between ">
        <FloatingLabel
          controlId="floatingInput"
          label="Search Department"
          className="mb-3"
          onChange={(e) => {setSearch(e.target.value)}}
>
          <Form.Control type="text" placeholder="search Department" />
        </FloatingLabel>
        <AddDepartment />
      </div>
      <div>
        <Departments search={search} />
      </div>
    </div>
  );
}
