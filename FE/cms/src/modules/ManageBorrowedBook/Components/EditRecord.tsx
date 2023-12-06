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
      title="Cập nhật thông tin sách mượn"
      okText="Cật nhật sách mượn"
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
          name="MemberId"
          label="Thành viên mượn"
          rules={[{ required: true, message: "Làm ơn chọn thành viên mượn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="BookId"
          label="Sách mượn"
          rules={[{ required: true, message: "Làm ơn chọn sách mượn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="BorrowedDate"
          label="Ngày mượn"
          rules={[{ required: true, message: "Làm ơn nhập ngày mượn" }]}
          valuePropName="date"
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("BorrowedDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="DueDate"
          label="Hạn trả"
          rules={[{ required: true, message: "Làm ơn nhập hạn trả" }]}
        >
           <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("DueDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="ReturnDate"
          label="Ngày trả"
        >
           <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("ReturnDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="KateFee"
          label="Phí trễ hạn"
        >
          <Input type="number"/>
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
        Sửa sách mượn
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
