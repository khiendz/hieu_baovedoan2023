"use client";
import { useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import LoginComponent from "components/LoginPopup";
import { useAppContext } from "hook/use-app-context";
import { userService } from "services";

export default function UserAccount() {
  const { data: user, setData: setUser } = useAppContext("user");
  const { setData: setOpen } = useAppContext("open-login-form");

  useEffect(() => {
    const subscription = userService.user.subscribe((data) => 
    {
      if (data && data.user)
        setUser(data?.user?.User)
    });
    return () => subscription.unsubscribe();
  },[]);

  function logout() {
    userService.logout();
    setOpen(true);
  }

  return (
      <div className="dk-pr-28 dk-flex dk-w-fit dk-h-full dk-items-center">
        {user ? (
          <div className="dk-flex dk-gap-5">
            Xin chào {`${user?.FirstName} ${user?.LastName}`}
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
  );
}
