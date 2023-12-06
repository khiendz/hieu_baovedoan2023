import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";

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
  return (
    <Modal
      open={open}
      title="Cập nhật thông tin độc giả"
      okText="Cật nhật độc giả"
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
          name="Name"
          label="Tên độc giả"
          rules={[{ required: true, message: "Làm ơn nhập tên độc giả" }]}
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
          rules={[{ required: true, message: "Làm ơn nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Địa chỉ email"
          rules={[{ required: true, message: "Làm ơn nhập email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="JoinDate"
          label="Ngày tham gia"
          rules={[{ required: true, message: "Làm ơn nhập ngày tham gia" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="MemberRoleId"
          label="Kiểu độc giả"
          rules={[{ required: true, message: "Làm ơn chọn kiểu độc giả" }]}
        >
          <Input />
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
        Sửa thông tin độc giả
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
