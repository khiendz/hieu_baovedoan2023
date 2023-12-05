import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { useAppContext } from "hook/use-app-context";
import { RoleAccount, User } from "Models";

interface CollectionEditFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  save: any;
  form: FormInstance;
}

interface Props {
  onInit: any;
  Cancel: any;
  Save: any;
  Form: FormInstance;
}

const CollectionCreateForm: React.FC<CollectionEditFormProps> = ({
  open,
  onCreate,
  onCancel,
  save,
  form,
}) => {
  const { data: roleAccounts } = useAppContext("role-accounts");
  const { data: users } = useAppContext("users");

  return (
    <Modal
      open={open}
      title="Cập nhật thông tin tài khoản"
      okText="Cật nhật tài khoản"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        save();
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
            className="dk-w-full"
            defaultValue={
              { value: "1", label: "Minion"}
            }
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
            className="dk-w-full"
            defaultValue={
              { value: "1", label: "default"}
            }
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

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, onInit, Cancel } = props;

  useEffect(() => {
    if (open)
    onInit();
  }, [open]);

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
        Sửa tài khoản
      </Button>
      <CollectionCreateForm
        open={open}
        save={Save}
        form={Form}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
          Cancel();
          Form.resetFields();
        }}
      />
    </div>
  );
};

export default EditRecord;
