"use client";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

export default function UserAccount() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="dk-pr-28 dk-flex dk-w-fit dk-h-full">
        <button
          className="dk-text-[#FFF] dk-flex dk-flex-row dk-w-[170px] dk-justify-between dk-items-center hover:dk-opacity-[0.8] dk-font-semibold dk-text-lg dk-h-full"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          <UserOutlined />
          <span className="hover:dk-opacity-[0.8] dk-text-[#FFF] dk-font-Inter">
            Xin chào Thắng
          </span>
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="#FFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25 8.125L10 11.875L13.75 8.125"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isLogin ? "display-none" : ""
          } dk-absolute dk-bg-[#FFF] dk-p-4 dk-h-fit dk-text-[#222] dk-font-Inter dk-font-medium dk-text-sm dk-top-[64px] dk-rounded-sm dk-shadow-2xl user-infos dk-right-[82px]`}
        >
          <ul className="dk-flex dk-flex-col dk-items-center dk-justify-center dk-z-[99]">
            <li className="dk-w-full dk-flex dk-justify-start">
              <Link href={"./tai-khoan.htm"} className="dk-w-full dk-flex dk-justify-start hover:dk-bg-slate-500 dk-rounded hover:dk-text-[#FFF]">
                <span className="dk-w-full dk-align-middle dk-text-left dk-px-3">Tài khoản</span>
              </Link>
            </li>
            <li className="dk-w-full dk-flex dk-justify-start">
              <Link href={"./tai-khoan.htm"} className="dk-w-full dk-flex dk-justify-start hover:dk-bg-slate-500 dk-rounded  hover:dk-text-[#FFF]">
                <span className="dk-w-full dk-align-middle dk-text-left dk-px-3">Lịch sử giao dịch</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
