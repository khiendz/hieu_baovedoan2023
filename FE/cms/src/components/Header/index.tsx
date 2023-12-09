"use client";
import React from "react";
import { Roboto } from "next/font/google";
import UserAccount from "modules/UserAccount";
import Notification from "components/Notification";
import { useAppContext } from "hook/use-app-context";
import NotifYPopup from "components/NotifyPopup";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  const { data: user } = useAppContext("user");

  return (
    <header
      className={`dk-flex dk-flex-row dk-bg-[#8b0000] dk-h-16 dk-text-[#FFF] dk-gap-14 dk-justify-between dk-items-center dk-font-Inter ${
        user ? "" : "dk-hidden"
      }`}
    >
      <span className="dk-pl-8 dk-whitespace-nowrap dk-font-bold dk-text-[24px]">
        CMS quản lý thư viện trực tuyến
      </span>
      <div className="search dk-flex dk-flex-row dk-gap-6">
        <input
          type="text"
          id="site-search"
          placeholder="Tìm kiếm tài liệu ?"
          className={`${roboto.className} dk-border-[1px] dk-sha dk-rounded-lg dk-h-7 dk-w-96 
        focus:dk-outline-none dk-pl-[25px] dk-text-sm dk-appearance-none dk-pr-[25px] dk-shadow-md`}
        />
        <div className="dk-relative dk-h-full dk-w-fit dk-flex dk-justify-center dk-items-center"></div>
      </div>
      <UserAccount />
      <NotifYPopup></NotifYPopup>
    </header>
  );
}
