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
  publishers: Publisher[];
  bookTypes: BookType[];
  save: any;
  form: FormInstance;
  books: Book[];
}

interface Props {
  Authors: Author[];
  Publishers: Publisher[];
  BookTypes: BookType[];
  Save: any;
  Form: FormInstance;
  Books: Book[];
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  authors,
  publishers,
  bookTypes,
  save,
  form,
  books
}) => {
  return (
    <Modal
      open={open}
      title="Tạo một sách mới"
      okText="Tạo sách"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as Book;
        const data = bookTypes.map(
            (el: BookType) =>
              new Book_BookType(books.length + 1, el.BookTypeId, row, el)
          );
        save({
            ...row,Book_BookType: data,
            Quantity: parseInt(row?.Quantity ? row?.Quantity?.toString() : "0"),
            PublicYear: dayjs(row?.PublicYear) || dayjs(new Date()),
            Author: authors.filter((ob: Author) => ob.AuthorId === row.AuthorId)[0],
            Publisher: publishers.filter((ob: Publisher) => ob.PublisherId === row.PublisherId)[0]
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
          name="Title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Làm ơn nhập tiêu đề!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="BookType" label="Loại sách">
          <Select
            mode="multiple"
            className="dk-w-full"
            options={[
              ...bookTypes?.map((ob: BookType) => {
                return { value: ob.BookTypeId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("BookType", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="ISBN"
          label="ISBN"
          rules={[{ required: true, message: "Làm ơn nhập ISBN!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Làm ơn nhập số lượng!" }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="Location"
          label="Vị trí"
          rules={[{ required: true, message: "Làm ơn nhập vị trí!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="PublicYear" label="Năm xuất bản" className="dk-w-full">
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("PublicYear", value);
            }}
          />
        </Form.Item>
        <Form.Item name="Img" label="Ảnh đại diện" className="dk-w-full">
          <Input />
        </Form.Item>
        <Form.Item name="Barcode" label="Mã sách" className="dk-w-full">
          <Input />
        </Form.Item>
        <Form.Item name="AuthorId" label="Tác giả" className="dk-w-full">
          <Select
            className="dk-w-full"
            options={[
              ...authors?.map((ob: Author) => {
                return { value: ob.AuthorId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("AuthorId", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="PublisherId"
          label="Nhà xuất bản"
          className="dk-w-full"
        >
          <Select
            className="dk-w-full"
            options={[
              ...publishers?.map((ob: Publisher) => {
                return { value: ob.PublisherId, label: ob.Name, ob: ob };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("PublisherId", value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRecord: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { Authors, Publishers, BookTypes, Save, Form, Books } = props;

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
        publishers={Publishers}
        bookTypes={BookTypes}
        save={Save}
        form={Form}
        books={Books}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
