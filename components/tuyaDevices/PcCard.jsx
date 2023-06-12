"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import { setSwitch } from "@/lib/tuyaDeviceManagement";
export default function PcCard({ device, onChange }) {
  const [modalShow, setModalShow] = useState(false);
  console.log({ device });
  const switchState = (deviceId, switchNbr, value) => {
    setSwitch(deviceId, switchNbr, value).then(() => {
      setModalShow(false);
      onChange();
    });
  };
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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {device.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className=" grid grid-cols-3 gap-2 ">
            {device.status?.map((status, index) => {
              return (
                // <Row key={index} className=" m-[20px] border-b-2 ">
                <Col key={index} className=" m-[20px] border-b-2 ">
                  <Row className=" text-black ">{status.code}:</Row>
                  <Row className=" text-blue-700 ">
                    {" "}
                    {typeof status.value == "boolean" ? (
                      status.value ? (
                        <div className=" flex flex-row items-center justify-between ">
                          {" "}
                          <div className=" flex flex-row items-center content-between ">
                            <div className=" h-[10px] w-[10px] bg-green-500 rounded-full mr-[5px] "></div>
                            <div> enabled </div>
                          </div>
                          <div className=" mr-[20px] ">
                            {status.code.toLowerCase().includes("switch") && (
                              <>
                                <Button
                                  onClick={() =>
                                    switchState(device.id, status.code, false)
                                  }
                                >
                                  turn of switch{" "}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className=" flex flex-row items-center justify-between ">
                          <div className=" flex flex-row items-center content-between ">
                            <div className=" h-[10px] w-[10px] bg-red-500 rounded-full mr-[5px] "></div>
                            <div> disabled</div>
                          </div>
                          <div className="mr-[20px]">
                            {status.code.toLowerCase().includes("switch") && (
                              <>
                                <Button
                                  onClick={() =>
                                    switchState(device.id, status.code, true)
                                  }
                                >
                                  turn on switch{" "}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    ) : (
                      status.value
                    )}
                    {/* </Row> */}
                  </Row>
                </Col>
              );
            })}
          </Container>
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

// {
//   active_time: 1686232876,
//   biz_type: 0,
//   category: 'co2bj',
//   create_time: 1686232876,
//   icon: 'smart/icon/ay1511250453937mDBJE/22246830a4319f4ed0bb8af9dd0f1b31.png',
//   id: 'bf048da0f8f8bc696asydb',
//   ip: '154.121.76.31',
//   lat: '35.6641',
//   local_key: 'UQ2L)1L>Vnl&xEQ/',
//   lon: '-0.6372',
//   model: 'RSH-',
//   name: 'Co2 Meter',
//   online: true,
//   owner_id: '155345297',
//   product_id: 'nqn4erultrywdshj',
//   product_name: 'Co2 Meter',
//   status: [
//     [Object], [Object],
//     [Object], [Object],
//     [Object], [Object],
//     [Object]
//   ],
//   sub: false,
//   time_zone: '+01:00',
//   uid: 'eu1683383286898rzGHl',
//   update_time: 1686298835,
//   uuid: 'fe740dfe62d1e830'
// }
