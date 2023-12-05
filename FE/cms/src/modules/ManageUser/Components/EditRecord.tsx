import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { Account } from "Models";
import { useAppContext } from "hook/use-app-context";

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
  const { data: accounts } = useAppContext("accounts");
  return (
    <Modal
      open={open}
      title="Cập nhật người dùng"
      okText="Cập nhật"
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
              message: 'Số điện thoại không hợp lệ',
            }
          ]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item
          name="AccountId"
          label="Tài khoản"
        >
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

const EditRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, onInit, Cancel } = props;

  useEffect(() => {
    if (open) onInit();
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
        Cập nhật người dùng
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
