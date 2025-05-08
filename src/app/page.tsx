'use client'

import Home from "@/pages/Home";
import "./page.scss"
import Header from "@/components/Layout/Header";
import { Fragment } from "react";

export default function Main() {
  return (
    <div className="main">
      <Header title="expo."/>

      <div className="alignment">
        <Home/>
      </div>
    </div>
  );
}
