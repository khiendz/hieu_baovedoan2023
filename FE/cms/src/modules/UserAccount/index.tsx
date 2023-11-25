"use client";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import LoginComponent from "components/LoginPopup";

export default function UserAccount() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="dk-pr-28 dk-flex dk-w-fit dk-h-full dk-items-center">
        <LoginComponent/>
      </div>
    </>
  );
}
