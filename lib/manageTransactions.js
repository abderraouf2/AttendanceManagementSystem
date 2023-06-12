"use server";
import { getToken } from "./main";
let allTransactions = [];
let necessaryTransactions = [];
export const getTransactions = async () => {
  const token = await getToken();

  const response = await fetch(
    "http://20.127.184.47:8081/iclock/api/transactions/",
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token.token}`,
      },
    }
  );
  let json = await response.json();
  let data = [...json.data];

  while (json.next !== null) {
    if (json.next !== undefined) {
      let data2 = await fetchData(json.next);
      json = data2;
      data = [...data, ...data2.data];
    }
  }
  allTransactions = data;
  let checkIns = [];
  let checkOuts = [];
  data.map((transaction) => {
    transaction.punch_state_display.toLowerCase() === "check in"
      ? checkIns.push(transaction)
      : checkOuts.push(transaction);
  });
  let results = await transactionsData(checkIns, checkOuts);
  necessaryTransactions = results;
  console.log({transactions : data});
  return results;
};

export const transactionsData = async (checkIns, checkOuts) => {
  let attendance = {
    id: null,
    emp_code: null,
    name: "",
    lastName: "",
    date: "",
    checkIn: "",
    checkOutId: null,
    checkOut: "",
  };
  let transactions = [];
  checkIns.map((checkIn) => {
    let found = false;
    if (found === false) {
      if (transactions.length > 0) {
        transactions.map((transaction) => {
          let index = transactions.findIndex(
            (transac) => transac.id === transaction.id
          );
          if (
            transaction.emp_code == checkIn.emp_code &&
            transaction.date == checkIn.punch_time.substr(0, 10)
          ) {
            found = true;
          } else if (index == transactions.length - 1 && found === false) {
            attendance.id = checkIn.id;
            attendance.emp_code = checkIn.emp_code;
            attendance.name = checkIn.first_name;
            attendance.lastName = checkIn.last_name;
            attendance.date = checkIn.punch_time.substr(0, 10);
            attendance.checkIn = checkIn.punch_time.substr(10);

            let lastCheckOut = checkOuts.findLast((transaction) => {
              return (
                transaction.emp_code == attendance.emp_code &&
                transaction.punch_time.substr(0, 10) == attendance.date
              );
            });
            if (lastCheckOut) {
              attendance.checkOut = lastCheckOut.punch_time.substr(10);
              attendance.checkOutId = lastCheckOut.id;
            }
            transactions.push(attendance);
            attendance = {
              id: 0,
              emp_code: null,
              name: "",
              lastName: "",
              date: "",
              checkIn: "",
              checkOutId: null,
              checkOut: "",
            };
          }
        });
      } else {
        attendance.id = checkIn.id;
        attendance.emp_code = checkIn.emp_code;
        attendance.name = checkIn.first_name;
        attendance.lastName = checkIn.last_name;
        attendance.date = checkIn.punch_time.substr(0, 10);
        attendance.checkIn = checkIn.punch_time.substr(10);
        let lastCheckOut = checkOuts.findLast((transaction) => {
          return (
            transaction.emp_code == attendance.emp_code &&
            transaction.punch_time.substr(0, 10) == attendance.date
          );
        });
        if (lastCheckOut) {
          attendance.checkOut = lastCheckOut.punch_time.substr(10);
          attendance.checkOutId = lastCheckOut.id;
        }
        transactions.push(attendance);
        attendance = {
          id: 0,
          emp_code: null,
          name: "",
          lastName: "",
          date: "",
          checkIn: "",
          checkOutId: null,
          checkOut: "",
        };
      }
    }
  });

  return transactions;
};

export const fetchData = async (url) => {
  const token = await getToken();
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token.token}`,
    },
  });
  const json = await response.json();
  return json;
};

export const deleteUnecessaryTransactions = async () => {
  const token = await getToken();
  if (allTransactions.length > 0) {
    allTransactions.map((transaction) => {
      let found = false;
      necessaryTransactions.map(async (trnsctn) => {
        let index = necessaryTransactions.findIndex(
          (transac) => transac.id === trnsctn.id
        );
        if (transaction.id == trnsctn.id || transaction.id == trnsctn.checkOutId ) {
          found = true;
          console.log({ found });
        } else if (
          index == necessaryTransactions.length - 1 &&
          found === false
        ) {
          console.log({ found });
          let id = transaction.id;
          console.log({id});
          await fetch(
            `http://20.127.184.47:8081/iclock/api/transactions/${id}/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token.token}`,
              },
            }
          );
        }
      });
    });
    console.log({ necessaryTransactions });
    return true;
  } else {
    return false;
  }
};
