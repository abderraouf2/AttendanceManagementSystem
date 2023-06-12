"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button, Modal, Row, Col, Container, Table } from "react-bootstrap";
import { setSwitch, getDeviceLogs } from "@/lib/tuyaDeviceManagement";
export default function PIRCard({ device }) {
  const [modalShow, setModalShow] = useState(false);
  const [logs, setLogs] = useState([]);
  //   console.log({ device });
  const getLogs = async (deviceId) => {
    getDeviceLogs(deviceId).then((response) => {
      setLogs(response);
      console.log({ response });
    });
  };
  const getDate = (time) => {
    const date = new Date(time);
    return (
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDate() +
      " | " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "."
    );
  };
  useEffect(() => {
    getLogs(device.id);
  }, []);
  return (
    <>
      <div
        key={device.id}
        onClick={() => setModalShow(true)}
        className=" h-[20vh] w-[40vw] border-2 border-grey-300 flex flex-row content-between hover:bg-slate-200 ease-out duration-300 cursor-pointer "
      >
        <Image
          src={`https://openapi.tuyaeu.com/${device.icon}`}
          height={100}
          width={200}
          alt="device icon"
        ></Image>
        {console.log(device.id)}
        <div className=" flex flex-col items-start border-l-2 border-black pl-[20px] ">
          <p>
            {" "}
            <span> Device name: </span> {device.name}{" "}
          </p>
          <p>
            {" "}
            <span>Category: </span> {device.category}{" "}
          </p>
          <div className=" flex flex-row items-center content-between ">
            <div> State:</div>
            {device.online ? (
              <>
                <div className=" h-[10px] w-[10px] bg-green-500 rounded-full mr-[5px] ml-[5px] "></div>
                active
              </>
            ) : (
              <>
                <div className=" h-[10px] w-[10px] bg-red-500 rounded-full mr-[5px] ml-[5px] "></div>
                offline
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        size="xl"
        fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {device.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className=" grid grid-cols-2 gap-2 ">
            {device.status?.map((status, index) => {
              return (
                // <Row key={index} className=" m-[20px] border-b-2 ">
                <Col key={index} className=" m-[20px] border-b-2 ">
                  <Row className=" text-black ">{status.code}:</Row>
                  <Row className=" text-blue-700 ">
                    {" "}
                    {status.value}
                    {/* </Row> */}
                  </Row>
                </Col>
              );
            })}
          </Container>
          <Row>
            <div className=" w-[500px] h-[600px] border-2 border-black overflow-scroll ">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>event id</th>
                    <th>event time</th>
                    <th>status</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  {logs?.length > 0 &&
                    logs.map((log) => {
                      return (
                        <tr>
                          <td> {log.event_id} </td>
                          <td>{getDate(log.event_time)}</td>
                          <td>{log.status}</td>
                          <td>
                            {log.value ? log.value : <>person detected</>}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
