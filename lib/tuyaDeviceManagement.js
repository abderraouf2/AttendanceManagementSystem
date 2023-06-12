"use server";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";

const context = new TuyaContext({
  baseUrl: "https://openapi.tuyaeu.com",
  accessKey: "gjrrxnx793xrwm5pcq7m",
  secretKey: "d283d3c131ee4901b081dd749f515347",
});

export const getDevices = async () => {
  // Send commands
  const response = await context.request({
    path: `/v1.0/users/eu1683383286898rzGHl/devices`,
    method: "GET",
  });
  return response.result;
};

export const switchAlarm = async (deviceId, alarm) => {
  // Send commands
  const commands = await context.request({
    path: `/v1.0/iot-03/devices/${deviceId}/commands`,
    method: "POST",
    body: {
      commands: [
        {
          code: "alarm_switch",
          value: alarm,
        },
      ],
    },
  });
  if (!commands.success) {
    new Error();
  }
  console.log("Execution result:", commands);
};

export const setSwitch = async (deviceId, switchNbr, value) => {
  // Send commands
  const commands = await context.request({
    path: `/v1.0/iot-03/devices/${deviceId}/commands`,
    method: "POST",
    body: {
      commands: [
        {
          code: `${switchNbr}`,
          value: value,
        },
      ],
    },
  });
  if (!commands.success) {
    new Error();
  }
  console.log("Execution result:", commands);
};

export const getDeviceLogs = async (deviceId) => {
  const time = Date.now();
  const response = await context.request({
    path: `/v1.0/devices/${deviceId}/logs?start_row_key=&type=1,2&start_time=0&end_time=${time}`,
    method: "GET",
  });
  console.log({ response: response.result.logs });
  return response.result.logs;
};
