"use client";
import { getAreas } from "@/lib/manageAreas";
import { getDepartments } from "@/lib/manageDepartments";
import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import { updateEmployee } from "@/lib/manageEmployees";
import { AiFillEdit } from "react-icons/ai";
export default function EditEmployee({ employee }) {
  const [modalShow, setModalShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState(employee.first_name);
  const [lastName, setLastName] = useState(employee.last_name);
  const [hireDate, setHireDate] = useState(employee.hire_date);
  const [gender, setGender] = useState(employee.gender);
  const [area, setArea] = useState(employee.area[0].id);
  const [dept, setDept] = useState(employee.department);
  const [phone, setPhone] = useState(employee.mobile);
  const [areas, setAreas] = useState([]);
  const [depts, setDepts] = useState([]);
  const [address, setAddress] = useState(employee.address);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    await updateEmployee(
      employee.id,
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
    getAreas().then((areas) => setAreas(areas));
    getDepartments().then((departments) => setDepts(departments));
  }, []);
  return (
    <div>
      <AiFillEdit
        onClick={() => setModalShow(true)}
        size={20}
        style={{ color: "blue", cursor: "pointer" }}
      />
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>First name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue={name}
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
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Select gender:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option hidden value={gender}>
                    {
                    gender?.toLowerCase().includes('f') ? 'Female' : 'Male'
                    }
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
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
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
                  <option hidden value={employee.area[0].id}>
                    {employee.area[0].area_name}
                  </option>
                  {areas.map((area) => (
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
                  value={dept?.id}
                  onChange={(e) => setDept(e.target.value)}
                >
                  <option hidden value={dept?.id}>
                    {dept?.dept_name}
                  </option>
                  {depts.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.dept_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>Hire date:</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    placeholder="hire date"
                    defaultValue={hireDate}
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
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid address.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className=" w-[100%] h-[8vh] pt-[2vh] border-t-2 border-grey-400 flex justify-end ">
              <Button type="submit" className=" mr-[10px] ">
                Edit employee
              </Button>
              <Button onClick={() => setModalShow(false)} variant="danger">
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
