import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { Account, RoleAccount, User } from "Models";
import { useAppContext } from "hook/use-app-context";
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
  const { data: accounts, setData: setAccounts } =
    useAppContext("accounts");
  const { data: roleAccounts } = useAppContext("role-accounts");
  const { data: users } = useAppContext("users");

  return (
    <Modal
      open={open}
      title="Tạo tài khoản mới"
      okText="Tạo tài khoản"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Account;
        const result = await save(
          {
            ...row,
            RoleId: parseInt(row.RoleId.toString()),
            UserId: row?.UserId ? parseInt(row?.UserId?.toString()) : null
          },
          setAccounts,
          accounts
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
          name="UserName"
          label="UserName"
          rules={[{ required: true, message: "Làm ơn nhập UserName" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
            name="Password" 
            label="Password"
            rules={[{ required: true, message: "Làm ơn nhập password" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
          name="RoleId"
          label="Kiểu role"
          rules={[
            { required: true, message: "Làm ơn chọn role" }
        ]}
        >
          <Select
            placeholder="Chọn role account"
            className="dk-w-full"
            options={[
              ...roleAccounts?.map((ob: RoleAccount) => {
                return { value: ob.RoleId, label: ob.RoleName, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("RoleId", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="UserId"
          label="Người dùng"
        >
          <Select
            placeholder="Chọn thông tin người dùng"
            className="dk-w-full"
            options={users ? [
              ...users?.map((ob: User) => {
                return { value: ob?.UserId, label: `${ob?.FirstName + " " + ob?.LastName}`, ob: ob };
              }),
            ] : []}
            onChange={(value) => {
              form.setFieldValue("UserId", value);
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
        Thêm tài khoản
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
