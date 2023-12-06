import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import dayjs from "dayjs";

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
      title="Cập nhật thông tin nhà xuất bản"
      okText="Cật nhật"
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
          label="Tên nhà xuất bản"
          rules={[{ required: true, message: "Làm ơn nhập tên nhà xuất bản" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Địa chỉ nhà xuất bản"
          rules={[
            { required: true, message: "Làm ơn nhập địa chỉ nhà xuất bản" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="PHONE"
          label="Số điện thoại"
          rules={[{ required: true, message: "Làm ơn nhập số điện thoại" }]}
        >
          <Input type="nunber" />
        </Form.Item>
        <Form.Item
          name="Website"
          label="Địa chỉ website"
          rules={[{ required: true, message: "Làm ơn nhập địa chỉ website" }]}
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
        Sửa thông tin nhà xuất bản
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
