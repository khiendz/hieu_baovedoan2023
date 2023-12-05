import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import UploadFileImage from "components/UploadFileImage";

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
      title="Cập nhật thông loại sách"
      okText="Cật nhật loại sách"
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
          label="Tên loại sách"
          rules={[{ required: true, message: "Làm ơn nhập tên loại sách" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Mô tả loại sách"
          rules={[{ required: true, message: "Làm ơn nhập mô tả loại sách" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Img"
          label="Ảnh thumb"
          rules={[{ required: true, message: "Làm ơn nhập ảnh thumb" }]}
        >
          <UploadFileImage lengthMaxImage={1} form={form} keyField="Img" />
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
        Sửa loại sách
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
