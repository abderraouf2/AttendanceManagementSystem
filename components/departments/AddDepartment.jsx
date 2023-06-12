"use client";
import React, { useState, useRef } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { createDepartment } from "@/lib/manageDepartments";
import SimpleReactValidator from "simple-react-validator";
export default function Adddepartment(props) {
  const [modalShow, setModalShow] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState(0);
  const validator = useRef(new SimpleReactValidator());

  const addDepartment = async () => {
    if (validator.current.allValid()) {
      await createDepartment(code, name);
      props.onChange();
      setModalShow(false);
    } else {
      validator.current.showMessages();
      setUpdate(1);
    }
  };
  return (
    <div>
      <Button
        variant="success"
        style={{ height: "6vh", width: "9vw" }}
        onClick={() => setModalShow(true)}
      >
        Add department
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Add dept</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="code"
            label="department code"
            className="mb-3"
            onChange={(e) => setCode(e.target.value)}
          >
            <Form.Control type="text" placeholder="department code" />
            {validator.current.message("code", code, "required|string", {
              className: "text-danger",
            })}
          </FloatingLabel>
          <FloatingLabel
            controlId="department name"
            label="department name"
            className="mb-3"
            onChange={(e) => setName(e.target.value)}
          >
            <Form.Control type="text" placeholder="department name" />
            {validator.current.message("name", name, "required|string", {
              className: "text-danger",
            })}
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addDepartment()} variant="success">
            Add department
          </Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
