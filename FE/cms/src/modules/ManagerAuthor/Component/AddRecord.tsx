import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import { Author } from "Models/Author";
import { Publisher } from "Models/Publisher";
import { BookType } from "Models/BookType";
import dayjs from "dayjs";
import { Book } from "Models/Book";
import { Book_BookType } from "Models/Book_BookType";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  authors: Author[];
  save: any;
  form: FormInstance;
}

interface Props {
  Authors: Author[];
  Save: any;
  Form: FormInstance;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  authors,
  save,
  form
}) => {
  return (
    <Modal
      open={open}
      title="Thêm một tác giả mới"
      okText="Thêm tác giả"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Book;
        console.log(row);
        save({
            ...row
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
          label="Tên tác giả"
          rules={[{ required: true, message: "Làm ơn nhập tên tác giả!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Mô tả"
          rules={[{ required: true, message: "Làm ơn nhập mô tả!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Authors, Save, Form } = props;

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
        New Collection
      </Button>
      <CollectionCreateForm
        open={open}
        authors={Authors}
        save={Save}
        form={Form}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
