"use client";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Spinner, Form, Col, InputGroup } from "react-bootstrap";
import {
  getTransactions,
  deleteUnecessaryTransactions,
} from "@/lib/manageTransactions";
import { FiRefreshCw, FiTrash } from "react-icons/fi";
import styles from "../employees/employees.module.css";
import cls from "classnames";

export default function Transactions(props) {
  const search = props.search ? props.search : "";
  const date = new Date();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [thisMonth, setThisMonth] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [Today, setToday] = useState(() => {
    let month;
    let day;
    if (date.getMonth() < 9) {
      month = "0" + (date.getMonth() + 1);
    } else {
      month = date.getMonth() + 1;
    }
    if (date.getDate() < 10) {
      day = "0" + date.getDate();
    } else {
      day = date.getDate();
    }
    return `${date.getFullYear()}-${month}-${day}`;
  });
  const [selectDate, setSelectDate] = useState(Today);

  const refresh = async () => {
    setLoading(true);
    await getTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  };

  const deleteTransactions = async () => {
    setLoadingDelete(true);
    await deleteUnecessaryTransactions().then((response) => {
      setLoadingDelete(false);
    });
  };

  function toSeconds(time_str) {
    // Extract hours, minutes and seconds
    var parts = time_str.split(":");
    // compute  and return total seconds
    return (
      parts[0] * 3600 + // an hour has 3600 seconds
      parts[1] * 60 + // a minute has 60 seconds
      +parts[2]
    ); // seconds
  }

  const getThisMonth = () => {
    switch (thisMonth) {
      case "today": {
        setSelectDate(
          `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`
        );
        break;
      }
      case "this month": {
        let month;
        if (date.getMonth() < 9) {
          month = "0" + (date.getMonth() + 1);
        } else {
          month = date.getMonth() + 1;
        }
        setSelectDate(`${date.getFullYear()}-${month}`);
        break;
      }
      case "last month": {
        let month;
        if (date.getMonth() < 9) {
          month = "0" + date.getMonth();
        } else {
          month = date.getMonth();
        }
        setSelectDate(`${date.getFullYear()}-${month}`);
        Today.substr(0, 7);
        break;
      }
      case "this year": {
        setSelectDate(`${date.getFullYear()}`);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    getThisMonth();
  }, [thisMonth]);

  const diffrence = (checkIn, checkOut) => {
    var difference = Math.abs(toSeconds(checkOut) - toSeconds(checkIn));

    // format time differnece
    var result = [
      Math.floor(difference / 3600), // an hour has 3600 seconds
      Math.floor((difference % 3600) / 60), // a minute has 60 seconds
      difference % 60,
    ];
    // 0 padding and concatation
    result = result
      .map(function (v) {
        return v < 10 ? "0" + v : v;
      })
      .join(":");
    if (result === "NaN:NaN:NaN") {
      result = "--:--:--";
    }
    return <>{result}</>;
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className=" w-[90vw] h-[550px] mt-[2vh] ">
      <div className=" w-[100%] flex justify-between mb-[10px] ">
        <div className=" w-[20vw] h-[6vh] ">
          <Form.Select
            aria-label="Default select example"
            defaultValue={selectDate}
            className=" h-[100%] "
            onChange={(e) => setThisMonth(e.target.value)}
          >
            <option disabled hidden value="">
              filter by month
            </option>
            <option value="today">today</option>
            <option value="this month">this month</option>
            <option value="last month">last month</option>
            <option value="this year">this year</option>
          </Form.Select>
        </div>
        <div className=" w-[55%] flex flex-row justify-between ">
          <Form.Group
            className=" flex flex-row mr-[10px] w-[45%] "
            md="3"
            controlId="validationCustomUsername"
          >
            <Form.Label className=" w-[40%] ">filter by date:</Form.Label>
            <InputGroup>
              <Form.Control
                type="date"
                placeholder="hire date"
                aria-describedby="inputGroupPrepend"
                onChange={(e) => setSelectDate(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Button
            className={cls(styles.btn, " w-[25%] flex flex-row ")}
            onClick={() => refresh()}
            variant="primary"
          >
            <FiRefreshCw /> Refresh
          </Button>
          <Button
            className={cls(styles.delBtn, " w-[25%] flex flex-row ")}
            onClick={() => deleteTransactions()}
            variant="danger"
          >
            <FiTrash />{" "}
            {loadingDelete ? (
              <>
                {" "}
                <Spinner
                  animation="grow"
                  size="xl"
                  style={{ width: "1rem", height: "1rem" }}
                />{" "}
                deleting...
              </>
            ) : (
              <>delete transactions</>
            )}
          </Button>
        </div>
      </div>
      <div className=" w-[90vw] h-[530px] border-2 border-black overflow-scroll ">
        {loading ? (
          <div className=" h-[100%] w-[100%] flex justify-center items-center ">
            <Spinner
              animation="grow"
              size="xl"
              style={{ width: "5rem", height: "5rem" }}
            />
          </div>
        ) : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Date</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Time worked</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length > 0 &&
                transactions
                  .filter(
                    (transaction) =>
                      transaction.date.includes(selectDate) &&
                      transaction.name?.toLowerCase().includes(search)
                  )
                  .map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.name}</td>
                      <td>{transaction.lastName}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.checkIn}</td>
                      <td>{transaction.checkOut}</td>
                      <td>
                        {diffrence(transaction.checkIn, transaction.checkOut)}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
