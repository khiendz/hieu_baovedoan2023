"use client";

import React, { useState } from "react";
import { HomeOutlined, EditOutlined, BookOutlined, UserAddOutlined, UsergroupAddOutlined, 
  UserOutlined, InsertRowAboveOutlined, MehOutlined, RocketOutlined, EuroOutlined, FlagOutlined } from "@ant-design/icons";
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
        QUẢN TRỊ SÁCH
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
    children: [
      {
        label: (
          <Link
            href="/"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            SÁCH
          </Link>
        ),
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: (
          <Link
            href="/book-type"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Loại sách</span>
          </Link>
        ),
        key: "book-type",
        icon: <InsertRowAboveOutlined />,
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
        key: "author",
        icon: <EditOutlined />,
      },
      {
        label: (
          <Link
            href="/publisher"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Nhà xuất bản</span>
          </Link>
        ),
        key: "publisher",
        icon: <FlagOutlined />
      },
    ],
  },
  {
    label: (
      <Link
        href="/muon-sach"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Quản trị mượn sách</span>
      </Link>
    ),
    key: "order",
    children: [
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
        icon: <BookOutlined />,
      },
      {
        label: (
          <Link
            href="/late-fee"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Trễ hạn</span>
          </Link>
        ),
        key: "late-fee",
      },
      {
        label: (
          <Link
            href="/late-fee-type"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Loại phí trễ hạn</span>
          </Link>
        ),
        key: "late-fee-type",
      },
      {
        label: (
          <Link
            href="/payment"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Thanh toán</span>
          </Link>
        ),
        key: "payment",
        icon: <EuroOutlined />
      },
    ]
  },
  {
    label: (
      <Link
        href="/account"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold dk-"
      >
        <span>Quản trị người dùng và độc giả</span>
      </Link>
    ),
    key: "account",
    children: [
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
        icon: <UserAddOutlined />,
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
        icon: <UserOutlined />
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
        icon: <UsergroupAddOutlined />
      },
    
      {
        label: (
          <Link
            href="/employee"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Nhân viên</span>
          </Link>
        ),
        key: "employee",
        icon: <MehOutlined />
      },
      {
        label: (
          <Link
            href="/employee-type"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Loại nhân viên</span>
          </Link>
        ),
        key: "employee-type",
        icon: <RocketOutlined />
      },
      {
        label: (
          <Link
            href="/member"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Độc giả</span>
          </Link>
        ),
        key: "member",
      },
      {
        label: (
          <Link
            href="/member-role"
            className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
          >
            <span>Kiểu độc giả</span>
          </Link>
        ),
        key: "member-role",
      },
    ]
  },
  {
    label: (
      <Link
        href="/article"
        className="dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold"
      >
        <span>Tin tức</span>
      </Link>
    ),
    key: "article",
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
