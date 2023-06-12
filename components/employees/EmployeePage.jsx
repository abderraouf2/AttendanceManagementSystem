"use client";
import React, { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import AddEmployee from "./AddEmployee";
import Employees from "./Employees";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadDataToDevice } from "@/lib/main";
import { logout } from "@/lib/login";
import { useRouter } from "next/navigation";
import cls from "classnames";
import styles from "./employees.module.css";

export default function EmployeePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const uploadData = async () => {
    setLoading(true);
    await uploadDataToDevice().then(() => {
      setLoading(false);
    });
  };
  const logOut = async () => {
    setLogoutLoading(true);
    await logout().then(() => {
      router.push("/login");
      setLogoutLoading(false);
    });
  };
  return (
    <div>
      <div className=" h-[10vh] w-[90vw] mt-[5vh] flex flex-row justify-between ">
        <FloatingLabel
          controlId="floatingInput"
          label="Search Employee"
          className="mb-3"
          onChange={(e) => setSearch(e.target.value)}
        >
          <Form.Control type="text" placeholder="search employee" />
        </FloatingLabel>
        <div className=" w-[35vw] h-[6vh] flex flex-row justify-between ">
          <AddEmployee />
          <Button className={cls(styles.btn, " w-[15vw] ")} onClick={() => uploadData() }>
            <AiOutlineCloudUpload size={15} />
            {loading ? <>uploading...</> : <>upload to device</>}
          </Button>
          <Button
            onClick={() => logOut()}
            className={cls(styles.btn, " w-[10vw] ")}
          >
            {logoutLoading ? <>logging out...</> : <>logout</>}
          </Button>
        </div>
      </div>
      <div>
        <Employees search={search} />
      </div>
    </div>
  );
}
