"use client";
import React, { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { FiRefreshCw } from "react-icons/fi";
import Transactions from "./Transactions";

export default function TransactionPage() {
  const [search, setSearch] = useState("");
    const [date, setDate] = useState('today')
  return (
    <div>
      <div className=" h-[10vh] w-[90vw] mt-[5vh] flex flex-row justify-between ">
        <FloatingLabel
          controlId="floatingInput"
          label="Search by employee name"
          className="mb-3"
          onChange={ (e) => setSearch(e.target.value) }
        >
          <Form.Control type="text" placeholder="Search by employee name" />
        </FloatingLabel>
        <div className=" w-[100%] h-[6vh] flex justify-end mb-[10px] ">
          
        </div>
      </div>
      <div>
        <Transactions search={search} />
      </div>
    </div>
  );
}
