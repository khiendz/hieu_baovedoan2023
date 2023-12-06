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
      title="Cập nhật thông tin thanh toán"
      okText="Cật nhật thanh toán"
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
          name="LateFeeId"
          label="Phí trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập phí trễ hạn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="PaymentDate"
          label="Ngày thanh toán"
          rules={[{ required: true, message: "Làm ơn nhập ngày thanh toán" }]}
          valuePropName="date"
        >
             <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("PaymentDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="Amount"
          label="Tổng tiền thanh toán"
          rules={[{ required: true, message: "Làm ơn nhập tổng tiền thanh toán" }]}
        >
          <Input type="nunber"/>
        </Form.Item>
        <Form.Item
          name="StatePayment"
          label="Trạng thái thanh toán"
          rules={[{ required: true, message: "Làm ơn nhập trạng thái thanh toán" }]}
        >
          <Input type="nunber"/>
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
        Sửa thông tin thanh toán
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
