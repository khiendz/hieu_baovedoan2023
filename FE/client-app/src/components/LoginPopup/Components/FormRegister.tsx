import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useAppContext } from "hook/use-app-context";
import { User } from "Models/User.model";
import { Account } from "Models/Account.model";
import { AddUser } from "services/users-service";
import { AddAccount } from "services/account-service";

type FieldType = {
  username?: string;
  password?: string;
  FirstName: string;
  LastName: string;
  Address: string;
  Phone: string;
};

const FormRegister: React.FC<any> = (props: any) => {
  const { setData: setPopup } = useAppContext("popup-message");

  useEffect(() => {
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const onFinish = async (values: any) => {
    try {
      const user:User = { 
        UserId: null,
        FirstName : values.FirstName,
        LastName : values.LastName,
        Address :  values.Address,
        Phone : values.Phone,
        AccountId: null,
        Account: []
      };

      const accountRegister = new Account();
      accountRegister.UserName = values.userName;
      accountRegister.Password = values.password;

      const resultAddUser = await AddUser(user);

      if (!resultAddUser || resultAddUser.status != 200) {
        setPopup({
          title: "Thất bại",
          messagePopup: "Đăng ký không thành công, vui lòng thử lại",
          state: false,
        });
      } 

      const userData = resultAddUser.data as User;
      accountRegister.UserId = userData.UserId || 0;
      const resultRegister = await AddAccount(accountRegister);

      setPopup({
        title: resultRegister?.status == 200 ? "Đăng ký thành công" : "Đăng ký thất bại",
        messagePopup: resultRegister?.message,
        state: resultRegister?.status == 200,
      });
      if (resultRegister && resultRegister.status == 200) {
        props.onCancel();
      }
    } catch {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        open={props?.open}
        onCancel={props.onCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Làm ơn nhập tên đăng nhập!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Làm ơn nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="Họ"
            name="FirstName"
            rules={[{ required: true, message: "Làm ơn nhập họ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Tên"
            name="LastName"
            rules={[{ required: true, message: "Làm ơn nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Địa chỉ"
            name="Address"
            rules={[{ required: true, message: "Làm ơn nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Số điện thoại"
            name="Phone"
            rules={[{ required: true, message: "Làm ơn nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormRegister;
