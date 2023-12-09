"use client";
import LayoutDefault from "components/layouts/LayoutDefault";
import React from "react";
import { format } from "date-fns";
import ManageBorrowedBook from "modules/ManageBorrowedBook";

export default function Order() {

  return (
    <LayoutDefault>
      <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4">
        <h1 className="dk-text-[#222] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          Quản trị mượn sách
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#222]">
          Trang tài liệu chính thống và đầy đủ số 1
        </h2>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-full dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
          <ManageBorrowedBook/>
        </div>
      </div>
    </LayoutDefault>
  );
}
