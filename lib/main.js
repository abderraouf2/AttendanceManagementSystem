'use server';


export const getToken = async () => {
    const response = await fetch(
      "http://20.127.184.47:8081/jwt-api-token-auth/", {
          method: "POST",
          cache:  'no-cache',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: 'raouf',
              password: 'raouf2903'
            })
      }
    );
    const json = await response.json();
    return json;
}

export const getDevices = async () => {
  const token = await getToken();
  const response = await fetch(
    "http://20.127.184.47:8081/iclock/api/terminals/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      }
    }
  );
  const json = await response.json();
  return json.data;
}

export const uploadDataToDevice = async () => {
  const token = await getToken();
  const devices = await getDevices()
 console.log({devices});
  const response = await fetch(
    "http://20.127.184.47:8081/iclock/api/terminals/upload_all/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
      body: JSON.stringify({
        "terminals" : [parseInt(devices[0].id)]
      })
    }
  );
  const json = await response.json();
  return json.data;
}