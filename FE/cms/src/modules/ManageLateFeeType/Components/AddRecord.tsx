import React, { useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import { LateFee, LateFeeType } from "Models";
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
  const { data: lateFeeTypes, setData: setLateFeeTypes } = useAppContext("late-fee-types");
  return (
    <Modal
      open={open}
      title="Thêm mới loại trễ hạn"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as LateFeeType;
        const result = await save(
          {
            ...row,
          },
          setLateFeeTypes,
          lateFeeTypes
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
          name="FeeAmount"
          label="Phí trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập phí trễ hạn" }]}
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
        Thêm mới loại trễ hạn
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
