import React, { useState } from "react";
import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import { Payment } from "Models";
import { useAppContext } from "hook/use-app-context";
import dayjs from "dayjs";
import { Publisher } from "Models/Publisher";
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
  const { data: publishers, setData: setPublishers } =
    useAppContext("publishers");
  return (
    <Modal
      open={open}
      title="Thêm mới nhà xuất bản"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Publisher;
        const result = await save(
          {
            ...row,
          },
          setPublishers,
          publishers || []
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
        Thêm nhà xuất bản
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
