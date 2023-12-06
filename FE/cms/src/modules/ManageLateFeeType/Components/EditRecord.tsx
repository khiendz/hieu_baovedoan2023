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
      title="Cập nhật thông tin loại phí trễ hạn"
      okText="Cật nhật loại phí trễ hạn"
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
          label="Tên loại trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập tên loại trễ hạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Miêu tả loại trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập mô tả loại trễ hạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="FeeAmount"
          label="Phí trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập tổng phí trễ hạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="DateCount"
          label="Số ngày tính phí trễ 1 lần"
          rules={[{ required: true, message: "Làm ơn nhập số ngày tính phí trễ 1 lần" }]}
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
        Sửa thông tin loại phí trễ hạn
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
