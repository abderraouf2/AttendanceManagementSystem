"use client";

import React, { useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteEmployeeById } from "@/lib/manageEmployees";
import { Spinner } from "react-bootstrap";
export default function DeleteEmployee(props) {
  const { id } = props;
  const [modalShow, setModalShow] = useState(false);
  const [idEntered, setIdEntered] = useState("");
  const [loading, setLoading] = useState(false);
  const deleteEmployee = async () => {
    if (idEntered == id) {
      setLoading(true);
      await deleteEmployeeById(id).then(() => {
        props.onChange();
        setLoading(false);
      });
    }
  };
  return (
    <div>
      <FaRegTrashAlt
        onClick={() => setModalShow(true)}
        className=" text-red "
        style={{ color: "red", cursor: "pointer" }}
      />

      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter {id} to delete the employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="code"
            label="employee's id"
            className="mb-3"
            onChange={(e) => setIdEntered(e.target.value)}
          >
            <Form.Control type="text" placeholder="employee's id" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          {
            <Button onClick={() => deleteEmployee()} variant="danger">
              {loading ? (
                <>
                  <Spinner animation="border" />
                </>
              ) : (
                <> delete</>
              )}
            </Button>
          }
          <Button variant="success" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
