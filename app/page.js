"use client";

import "bootstrap/dist/css/bootstrap.min.css";

import Link from "next/link";
export default function Home() {
  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <Link href="/employees">Check employee's page</Link>
    </div>
  );
}
