import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useAppContext } from "hook/use-app-context";
import Router from "next/router";
import { userService } from "services";

const Unauthorize: React.FC<any> = (props: any) => {
  const { setData: setOpen } = useAppContext("open-login-form");

  useEffect(() => {
    if (userService.userValue) Router.push("/");
  }, [userService.userValue]);

  return (
    <Result
      status="warning"
      title="Vui lòng đăng nhập để truy cập trang web."
      extra={
        <Button
          type="primary"
          onClick={() => {
            if (!userService.userValue) setOpen(true);
          }}
        >
          Đăng nhập
        </Button>
      }
    />
  );
};

export default Unauthorize;
