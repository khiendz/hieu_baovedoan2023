import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { userService } from "services";
import { useAppContext } from "hook/use-app-context";
import Notification from "components/Notification";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const FormLogin: React.FC<any> = (props: any) => {
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
      const result = await userService.login(values.username, values.password);
      setPopup({
        title: result?.status == 200 ? "Thành công" : "Thất bại",
        messagePopup: result?.message,
        state: result?.status == 200,
      });
      if (result && result.status == 200) {
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
            label="Lưu đăng nhập"
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Notification />
    </>
  );
};

export default FormLogin;
