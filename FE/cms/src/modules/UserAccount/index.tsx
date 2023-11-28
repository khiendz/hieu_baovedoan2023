"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import LoginComponent from "components/LoginPopup";
import { useAppContext } from "hook/use-app-context";
import { userService } from "services";

export default function UserAccount() {
  const { data: user, setData: setUser } = useAppContext("user");
  const { data: open, setData: setOpen } = useAppContext("open-login-form");

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
    setOpen(true);
  }

  return (
    <>
      <div className="dk-pr-28 dk-flex dk-w-fit dk-h-full dk-items-center">
        {user ? (
          <div className="dk-flex dk-gap-5">
            Xin chào {`${user.user.User.FirstName} ${user.user.User.LastName}`}
            <button
              onClick={logout}
              className="nav-item nav-link hover:dk-cursor-pointer"
            >
              <LogoutOutlined />
            </button>
          </div>
        ) : (
          <LoginComponent />
        )}
      </div>
    </>
  );
}
