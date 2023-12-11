"use client";
import LayoutDefault from "components/layouts/LayoutDefault";
import React from "react";
import ManageAccount from "modules/ManageAccount";

export default function Home() {
  return (
    <LayoutDefault>
      <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-relative dk-z-10">
        <h1 className="dk-text-[#222] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          Quản trị tài khoản
        </h1>
        <ManageAccount />
      </div>
    </LayoutDefault>
  );
}
