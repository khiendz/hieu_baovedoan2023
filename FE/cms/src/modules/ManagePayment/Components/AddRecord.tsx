import React, { useState } from "react";
import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import { Payment } from "Models";
import { useAppContext } from "hook/use-app-context";
import dayjs from "dayjs";
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
  const { data: payments, setData: setPayments } =
  useAppContext("payments");
  return (
    <Modal
      open={open}
      title="Thêm mới thanh toán"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Payment;
        const result = await save(
          {
            ...row,
          },
          setPayments,
          payments
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
        Thêm thanh toán
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
