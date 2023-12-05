import React, { useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { useAppContext } from "hook/use-app-context";
import { Account, User } from "Models";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  save: any;
  form: FormInstance;
  setPopup: any;
}

interface Props {
  Save: any;
  Form: FormInstance;
  setPopup: any;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
  setPopup,
}) => {
  const { data: users, setData: setUsers } = useAppContext("users");
  const { data: accounts } = useAppContext("accounts");

  return (
    <Modal
      open={open}
      title="Tạo người dùng mới"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as User;
        const result = await save(
          {
            ...row,
          },
          setUsers,
          users
        );
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        onCreate();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="FirstName"
          label="Họ"
          rules={[{ required: true, message: "Làm ơn nhập họ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="LastName"
          label="Tên"
          rules={[{ required: true, message: "Làm ơn nhập tên" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Làm ơn nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Làm ơn nhập số điện thoại" },
            {
              pattern: /^(?:\+?84|0)(?:\d{9,10})$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input type={"number"}/>
        </Form.Item>
        <Form.Item name="AccountId" label="Tài khoản">
          <Select
            className="dk-w-full"
            defaultValue={{ value: "1", label: "default" }}
            options={
              accounts
                ? [
                    ...accounts?.map((ob: Account) => {
                      return {
                        value: ob?.UserId,
                        label: `Tài khoản: ${ob?.UserName}`,
                        ob: ob,
                      };
                    }),
                  ]
                : []
            }
            onChange={(value) => {
              form.setFieldValue("AccountId", value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, setPopup } = props;

  const onCreate = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Thêm người dùng
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        setPopup={setPopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
          Form.resetFields();
        }}
      />
    </div>
  );
};

export default AddRecord;
