import React, { useState, useEffect } from "react";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { Account, Author, BookType, RoleAccount, User } from "Models";
import { useAppContext } from "hook/use-app-context";
import UploadFileImage from "components/UploadFileImage";
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
  const { data: bookTypes, setData: setBookTypes } = useAppContext("book-types");

  return (
    <Modal
      open={open}
      title="Tạo loại sách mới"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as BookType;
        const result = await save(
          {
            ...row,
          },
          setBookTypes,
          bookTypes
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
          <UploadFileImage lengthMaxImage={1} form={form} keyField="Img"/>
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
        Thêm loại sách
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
