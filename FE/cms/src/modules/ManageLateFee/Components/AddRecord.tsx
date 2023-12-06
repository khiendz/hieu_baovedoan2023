import React, { useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import { LateFee } from "Models";
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
  const { data: lateFees, setData: setLateFees } = useAppContext("late-fees");
  return (
    <Modal
      open={open}
      title="Thêm mới trễ hạn"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as LateFee;
        const result = await save(
          {
            ...row,
          },
          setLateFees,
          lateFees
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
          name="TransactionId"
          label="Giao dịch"
          rules={[{ required: true, message: "Làm ơn chọn giao dịch" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="FeeAmount"
          label="Tổng phí trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập tổng phí trễ hạn" }]}
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
        Thêm thông tin trễ hạn
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
