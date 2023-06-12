"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { FiUsers } from "react-icons/fi";
import IoTDevicesPage from "@/components/tuyaDevices/IoTDevicesPage";
import EmployeePage from "@/components/employees/EmployeePage";
import AreaPage from "@/components/areas/AreaPage";
import DepartmentPage from "@/components/departments/DepartmentsPage";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineCoPresent, MdDeviceHub } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import TransactionPage from "@/components/transactions/TransactionsPage";
export default function Home() {
  const [show, setShow] = useState(false);
  const links = {
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "7vh",
    width: "100%",
    color: "white",
  };

  const [eventKey, setEventKey] = useState("/");

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
                <Nav.Link style={links} eventKey="/">
                  <FiUsers size={25} style={{ marginRight: "8px" }} />
                  {show && <h6> Employees</h6>}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link style={links} eventKey="/areas">
                  <AiOutlineShareAlt size={25} style={{ marginRight: "8px" }} />
                  {show && <h6> Areas</h6>}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link style={links} eventKey="/departments">
                  <FcDepartment size={25} style={{ marginRight: "8px" }} />
                  {show && <h6> Departments</h6>}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="links">
                <Nav.Link
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
