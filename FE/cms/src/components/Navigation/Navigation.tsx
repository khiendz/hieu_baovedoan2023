"use client";

import React, { useState } from "react";
import { HomeOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useAppContext } from "hook/use-app-context";

const items: MenuProps["items"] = [
  {
    label: (
      <Link
        href="/"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        TRANG CHỦ
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link
        href="/tac-gia"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Tác giả</span>
      </Link>
    ),
    key: "news",
    icon: <EditOutlined />,
  },
  {
    label: (
      <Link
        href="/muon-sach"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Mượn sách</span>
      </Link>
    ),
    key: "order",
    icon: <EditOutlined />,
  },
  {
    label: (
      <Link
        href="/account"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Tài khoản</span>
      </Link>
    ),
    key: "account",
    icon: <EditOutlined />,
  },
  {
    label: (
      <Link
        href="/user"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Người dùng</span>
      </Link>
    ),
    key: "user",
    icon: <EditOutlined />,
  },
  {
    label: (
      <Link
        href="/role-account"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Loại tài khoản</span>
      </Link>
    ),
    key: "role-account",
    icon: <EditOutlined />,
  },
];

const Navigation: React.FC = () => {
  const { data: user } = useAppContext("user");
  const [current, setCurrent] = useState("mail");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <nav>
      <Menu
        className={`dk-text-[#222] dk-text-lg dk-font-bold dk-py-3 dk-border-none dk-shadow-md dk-font-Inter ${
          user ? "" : "dk-hidden"
        }`}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </nav>
  );
};

export default Navigation;
