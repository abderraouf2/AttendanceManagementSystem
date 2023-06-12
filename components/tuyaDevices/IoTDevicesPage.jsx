"use client";

import React, { useEffect, useState } from "react";
import { getDevices } from "@/lib/tuyaDeviceManagement";
import { FiRefreshCw } from "react-icons/fi";
import { Button, Spinner } from "react-bootstrap";
import PcCard from "./PcCard";
import DeviceCard from "./DeviceCard";
import PIRCard from "./PIRCard";
export default function IoTDevicesPage() {
  const [devices, setDevices] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const getDevicesList = () => {
    setLoading(true);
    getDevices().then((response) => {
      setDevices(response);
      setLoading(false);
    });
  };
  useEffect(() => {
    getDevicesList();
  }, []);
  return (
    <div className=" w-[90vw] h-[550px] mt-[8vh] ">
      <div className=" w-[100%] flex justify-end mb-[10px] ">
        <Button
          className=" w-[10%] flex flex-row "
          onClick={() => getDevicesList()}
          variant="primary"
        >
          <FiRefreshCw /> Refresh
        </Button>
      </div>
      <div className=" w-[90vw] h-[600px] grid grid-cols-2 mt-[5vh] border-t-2 border-black">
        {devices?.length > 0 ? (
          devices.map((device) => {
            switch (device.category) {
              case "co2bj":
                return <DeviceCard device={device} onChange={getDevicesList} />;
                break;
              case "pc":
                return <PcCard device={device} onChange={getDevicesList} />;
              case "pir":
                return <PIRCard device={device} onChange={getDevicesList} />;
              default:
                break;
            }
            // <div key={device.id}>

            //   <DeviceCard device={device} />
            // </div>
          })
        ) : (
          <div className="  flex justify-center items-center border-2 border-black w-[90vw] ">
            <Spinner
              animation="grow"
              size="xl"
              style={{ width: "5rem", height: "5rem" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
