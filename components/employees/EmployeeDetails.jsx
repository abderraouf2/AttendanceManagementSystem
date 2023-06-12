"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Modal, Button, Row, Col, Container } from "react-bootstrap";

import { CgArrowsExpandUpRight } from "react-icons/cg";
export default function EmployeeDetails({ employee }) {
  const [modalShow, setModalShow] = useState(false);
 
  return (
    <div>
      <CgArrowsExpandUpRight
        onClick={() => setModalShow(true)}
        size={20}
        style={{ color: "green", cursor: "pointer" }}
      />

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            about  {'  '} {
              employee.first_name
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col lg="9">
                <Row className=" m-[20px] ">
                  <Col>
                    <Row>First name:</Row>
                    <Row>{employee.first_name}</Row>
                  </Col>
                  <Col>
                    <Row>Last name:</Row>
                    <Row>{employee.last_name}</Row>
                  </Col>
                </Row>
                <Row className=" m-[20px] ">
                  <Col>
                    <Row>Area:</Row>
                    <Row>{employee.area[0].area_name}</Row>
                  </Col>
                  <Col>
                    <Row>Department:</Row>
                    <Row>{employee.department.dept_name}</Row>
                  </Col>
                </Row>
                <Row className=" m-[20px] ">
                  <Col>
                    <Row>hire date:</Row>
                    <Row>{employee.hire_date}</Row>
                  </Col>
                  <Col>
                    <Row>Phone number:</Row>
                    <Row>{employee.mobile}</Row>
                  </Col>
                </Row>
                <Row className=" m-[20px] ">
                  <Col>
                    <Row>Address:</Row>
                    <Row>{employee.address}</Row>
                  </Col>
                  {/* <Col>
                    <Row>Phone number:</Row>
                    <Row>{employee.mobile}</Row>
                  </Col> */}
                </Row>
              </Col>
              <Col className=" border-2 border-grey-500 ">
                <Image
                  src={`http://20.127.184.47:8081/${employee.photo}`}
                  alt="employee's photo'"
                  height={150}
                  width={150}
                />
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
