import React, { useState } from "react";
import {
    Button,
  Form,
  FormInstance,
  Input,
  Modal,
} from "antd";
import FormLogin from "./Components/FormLogin";

const LoginComponent: React.FC<any> = (props) => {
    const [open, setOpen] = useState(false);
    return <>
      <Button
        className="dk-bg-[#FFF]"
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