import React from "react";
import {
    Button,
  Form,
} from "antd";
import FormLogin from "./Components/FormLogin";
import { useAppContext } from "hook/use-app-context";
import "./style.scss";

const LoginComponent: React.FC<any> = (props) => {

    const { data: open, setData: setOpen } = useAppContext("open-login-form");

    return <>
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
    </>
}

export default LoginComponent;