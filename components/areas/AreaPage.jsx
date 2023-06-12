"use client";
import React, { useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import AddArea from "./AddArea";
import Areas from "./Areas";

export default function AreaPage() {
    const [search, setSearch] = useState("")
  return (
    <div>
      <div className=" h-[10vh] w-[90vw] mt-[5vh] flex flex-row justify-between ">
        <FloatingLabel
        controlId="floatingInput"
        label="Search Area"
        className="mb-3"
        onChange={(e) => setSearch(e.target.value)}
      >
        <Form.Control type="text" placeholder="search Area" />
      </FloatingLabel>
        <AddArea />
      </div>
      <div>
        <Areas search={search} />
      </div>
    </div>
  );
}
