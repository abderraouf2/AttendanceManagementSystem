"use client";
import React, { useState, useRef } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { createArea } from "@/lib/manageAreas";
import SimpleReactValidator from "simple-react-validator";
export default function AddArea() {
  const [modalShow, setModalShow] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState(0);
  const validator = useRef(new SimpleReactValidator());

  const addArea = async () => {
    if (validator.current.allValid()) {
      await createArea(code, name);
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
        onClick={() => setModalShow(true)}
        style={{ height: "6vh", width: "9vw" }}
      >
        Add Area
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Add Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="code"
            label="area code"
            className="mb-3"
            onChange={(e) => setCode(e.target.value)}
          >
            <Form.Control type="text" placeholder="area code" />
            {validator.current.message("code", code, "required|string", {
              className: "text-danger",
            })}
          </FloatingLabel>
          <FloatingLabel
            controlId="area name"
            label="area name"
            className="mb-3"
            onChange={(e) => setName(e.target.value)}
          >
            <Form.Control type="text" placeholder="area name" />
            {validator.current.message("name", name, "required|string", {
              className: "text-danger",
            })}
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addArea()} variant="success">
            Add Area
          </Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
