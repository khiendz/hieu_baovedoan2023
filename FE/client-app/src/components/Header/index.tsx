"use client";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Roboto } from "next/font/google";
import UserAccount from "modules/UserAccount";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  const [searchInput,setInput] = useState("");
  return (
    <header className="dk-flex dk-flex-row dk-bg-[#8b0000] dk-h-16 dk-text-[#FFF] dk-gap-14 dk-justify-between dk-items-center dk-font-Inter">
      <span className="dk-pl-8 dk-whitespace-nowrap">Hiếu thư viện</span>
      <div className="search dk-flex dk-flex-row dk-gap-6 dk-pr-[600px]">
        <input
          type="text"
          id="site-search"
          placeholder="Tìm kiếm tài liệu ?"
          className={`${roboto.className} dk-border-[1px] dk-sha dk-rounded-lg dk-h-7 dk-w-96 
        focus:dk-outline-none dk-pl-[25px] dk-text-sm dk-appearance-none dk-pr-[25px] dk-shadow-md`}
        />
        <button>
          <SearchOutlined />
        </button>
      </div>
      <UserAccount />
    </header>
  );
}
