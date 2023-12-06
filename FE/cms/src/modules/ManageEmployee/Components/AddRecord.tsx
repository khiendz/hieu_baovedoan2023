import React, { useState } from "react";
import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import { Employee } from "Models";
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
  const { data: employees, setData: setEmployees } = useAppContext("employees");

  return (
    <Modal
      open={open}
      title="Thêm mới nhân viên"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Employee;
        const result = await save(
          {
            ...row,
          },
          setEmployees,
          employees
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
        Thêm thông tin nhân viên
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
