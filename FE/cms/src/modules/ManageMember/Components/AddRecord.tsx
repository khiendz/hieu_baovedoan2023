import React, { useState } from "react";
import { Button, Form, FormInstance, Input, Modal } from "antd";
import { LateFeeType, Member } from "Models";
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
  const { data: members, setData: setMembers } = useAppContext("members");
  return (
    <Modal
      open={open}
      title="Thêm mới độc gỉa"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Member;
        const result = await save(
          {
            ...row,
          },
          setMembers,
          members
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
          label="Tên độc giả"
          rules={[{ required: true, message: "Làm ơn nhập tên độc giả" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Làm ơn nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Làm ơn nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Email"
          label="Địa chỉ email"
          rules={[{ required: true, message: "Làm ơn nhập email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="JoinDate"
          label="Ngày tham gia"
          rules={[{ required: true, message: "Làm ơn nhập ngày tham gia" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="MemberRoleId"
          label="Kiểu độc giả"
          rules={[{ required: true, message: "Làm ơn chọn kiểu độc giả" }]}
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
        Thêm mới độc giả
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
