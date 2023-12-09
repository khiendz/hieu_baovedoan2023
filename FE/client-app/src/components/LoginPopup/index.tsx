import React from "react";
import { Button, Form } from "antd";
import FormLogin from "./Components/FormLogin";
import { useAppContext } from "hook/use-app-context";
import "./style.scss";
import FormRegister from "./Components/FormRegister";

const LoginComponent: React.FC<any> = (props) => {
  const { data: open, setData: setOpen } = useAppContext("open-login-form");
  const { data: openRegister, setData: setOpenRegister } =
    useAppContext("open-register-form");

  return (
    <div className="dk-flex dk-gap-3">
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Đăng nhập
      </Button>
      <FormLogin
        open={open}
        form={Form}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          setOpenRegister(true);
        }}
      >
        Đăng ký
      </Button>
      <FormRegister
        open={openRegister}
        form={Form}
        onCancel={() => {
          setOpenRegister(false);
        }}
      />
    </div>
  );
};

export default LoginComponent;
