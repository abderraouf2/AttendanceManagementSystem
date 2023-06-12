"use client";
import { getAreas } from "@/lib/manageAreas";
import { getDepartments } from "@/lib/manageDepartments";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { createEmployee } from "@/lib/manageEmployees";
export default function AddEmployee() {
  const [modalShow, setModalShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState(0);
  const [dept, setDept] = useState("");
  const [phone, setPhone] = useState("");
  const [areas, setAreas] = useState([]);
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    await createEmployee(
      name,
      lastName,
      hireDate,
      area,
      dept,
      phone,
      address,
      gender
    );
  };
  useEffect(() => {
    setLoading(true);
    getAreas().then((areas) => setAreas(areas));
    getDepartments().then((departments) => {
      setDepts(departments);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Button
        variant="success"
        className=" flex flex-row h-[6vh] "
        onClick={() => setModalShow(true)}
      >
        <AiOutlineUserAdd size={15} /> <p>Add employee</p>
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className=" w-[100%] h-[100%] flex content-center justify-center ">
              <Spinner animation="border" />
            </div>
          ) : (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>First name:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Last name:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Select gender:</Form.Label>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option hidden value="">
                      -- select gender --
                    </option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                  <Form.Label>Phone number:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Select area:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setArea(e.target.value)}
                    required
                  >
                    <option hidden value="">
                      -- select area --
                    </option>
                    {areas.length > 0 &&
                      areas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.area_name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Select department:</Form.Label>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    onChange={(e) => setDept(e.target.value)}
                  >
                    <option hidden value="">
                      -- select department --
                    </option>
                    {depts.length > 0 &&
                      depts.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.dept_name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Hire date:</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      placeholder="hire date"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(e) => setHireDate(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom05">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <div className=" w-[100%] h-[8vh] pt-[2vh] border-t-2 border-grey-400 flex justify-end ">
                <Button type="submit" className=" mr-[10px] ">
                  Add employee
                </Button>
                <Button onClick={() => setModalShow(false)} variant="danger">
                  Close
                </Button>
              </div>
            </Form>
          )}{" "}
        </Modal.Body>
      </Modal>
    </div>
  );
}
