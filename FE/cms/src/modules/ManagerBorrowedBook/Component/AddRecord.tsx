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
import { Member } from "Models/Member";
import { BorrowedBook } from "Models/BorrowedBook";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  members: Member[];
  borrowedBooks: BorrowedBook[];
  save: any;
  form: FormInstance;
  books: Book[];
}

interface Props {
  Members: Member[];
  BorrowedBooks: BorrowedBook[];
  Save: any;
  Form: FormInstance;
  Books: Book[];
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  members,
  borrowedBooks,
  save,
  form,
  books
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một row mượn sách mới"
      okText="Tạo mượn sách"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as BorrowedBook;
        save({
          ...row,
          KateFee: parseInt(row?.KateFee ? row?.KateFee?.toString() : "0")
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
          name="BookId"
          label="Tiêu đề sách mượn"
          rules={[{ required: true, message: "Làm ơn nhập tiêu đề!" }]}
        >
          <Select
            className="dk-w-full"
            options={[
              ...books?.map((ob: Book) => {
                return { value: ob.BookId, label: ob.Title, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("BookId", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="MemberId"
          label="Tên người mượn sách"
          rules={[{ required: true, message: "Làm ơn nhập tên người mượn sách!" }]}
        >
          <Select
            className="dk-w-full"
            options={[
              ...members?.map((ob: Member) => {
                return { value: ob.MemberId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("MemberId", value);
            }}
          />
        </Form.Item>
        <Form.Item name="BorrowDate" label="Ngày mượn" className="dk-w-full">
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("BorrowDate", value);
            }}
          />
        </Form.Item>
        <Form.Item name="DueDate" label="Hạn trả" className="dk-w-full">
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("DueDate", value);
            }}
          />
        </Form.Item>
        <Form.Item name="KateFee" label="Phí trễ hạn" className="dk-w-full">
          <Input
            defaultValue={0}
            type="number"
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("KateFee", value.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Save, Form, Books, Members, BorrowedBooks } = props;

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
        save={Save}
        form={Form}
        books={Books}
        members={Members}
        borrowedBooks={BorrowedBooks}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
