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
      title="Cập nhật thông tin nhân viên"
      okText="Cật nhật nhân viên"
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
          name="WorkSchedule"
          label="Lịch làm việc"
          rules={[{ required: true, message: "Làm ơn nhập lich làm việc" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="EmployeeTypeId"
          label="Loại nhân viên"
          rules={[{ required: true, message: "Làm ơn chọn loại nhân viên" }]}
        >
           <Input/>
        </Form.Item>
        <Form.Item
          name="UserId"
          label="Thông tin nhân viên"
        >
          <Input/>
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
        Sửa thông tin nhân viên
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
