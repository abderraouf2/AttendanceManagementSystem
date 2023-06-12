"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineCoPresent, MdDeviceHub } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { FiUsers } from "react-icons/fi";
import EmployeePage from "../employees/EmployeePage";
import AreaPage from "../areas/AreaPage";
import DepartmentPage from "../departments/DepartmentsPage";
import TransactionPage from "../transactions/TransactionsPage";
import IoTDevicesPage from "../tuyaDevices/IoTDevicesPage";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [show, setShow] = useState(false);
  var pathName = usePathname();
  const [eventKey, setEventKey] = useState(pathName);
  const links = {
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "7vh",
    width: "100%",
    color: "white",
  };
  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={eventKey}
        style={{ overflow: "hidden" }}
      >
        <Row style={{ height: "100vh" }}>
          <Col style={{ top: "0", left: "0", zIndex: "3" }}>
            <Nav
              variant="pills"
              className="flex-column sidebar"
              style={{
                backgroundColor: "#191D32",
                height: "100vh",
              }}
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <Nav.Item className="links">
                <Nav.Link href="/" style={links} eventKey="/">
                  <FiUsers size={25} style={{ marginRight: "8px" }} />
                  {show && <h6> Employees</h6>}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/areas" style={links} eventKey="/areas">
                  <AiOutlineShareAlt size={25} style={{ marginRight: "8px" }} />
                  {show && <h6> Areas</h6>}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link
                  href="/departments"
                  style={links}
                  eventKey="/departments"
                >
                  <FcDepartment size={25} style={{ marginRight: "8px" }} />
                  {show && <h6> Departments</h6>}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="links">
                <Nav.Link
                  href="/attendance"
                  style={links}
                  className="links"
                  eventKey="/attendance"
                >
                  <MdOutlineCoPresent
                    size={25}
                    style={{ marginRight: "8px" }}
                  />
                  {show && <h6> Attendance</h6>}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link
                  href="/devices"
                  style={links}
                  className="links"
                  eventKey="/IoTDevices"
                >
                  <MdDeviceHub size={25} style={{ marginRight: "8px" }} />
                  {show && <h6> Devices control</h6>}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={11}>
            <Tab.Content>
              <Tab.Pane eventKey="/">
                <EmployeePage />
              </Tab.Pane>
              <Tab.Pane eventKey="/areas">
                {" "}
                <AreaPage />
              </Tab.Pane>
              <Tab.Pane eventKey="/departments">
                <DepartmentPage />
              </Tab.Pane>
              <Tab.Pane eventKey="/attendance">
                <TransactionPage />
              </Tab.Pane>
              <Tab.Pane eventKey="/IoTDevices">
                <IoTDevicesPage />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
