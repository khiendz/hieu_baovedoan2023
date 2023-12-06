import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Space,
} from "antd";
import { Author } from "Models/Author";
import { Publisher } from "Models/Publisher";
import { BookType } from "Models/BookType";
import dayjs from "dayjs";
import { Book } from "Models/Book";
import { Book_BookType } from "Models/Book_BookType";
import UploadFileImage from "components/UploadFileImage";
import TextEditor from "components/TextEditor";

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
  setBook: any;
  setPopup: any;
}

interface Props {
  Authors: Author[];
  Publishers: Publisher[];
  BookTypes: BookType[];
  Save: any;
  Form: FormInstance;
  Books: Book[];
  setBook: any;
  setPopup: any;
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
  books,
  setBook,
  setPopup,
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
        const result = await save(
          {
            ...row,
            Book_BookType: data,
            Quantity: parseInt(row?.Quantity ? row?.Quantity?.toString() : "0"),
            PublicYear: row?.PublicYear
              ? dayjs(row?.PublicYear)
              : dayjs(new Date()),
            Author: authors.filter(
              (ob: Author) => ob.AuthorId === row.AuthorId
            )[0],
            Publisher: publishers.filter(
              (ob: Publisher) => ob.PublisherId === row.PublisherId
            )[0],
          },
          books,
          setBook
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
          name="Title"
          label="Tiêu đề"
          rules={[{ required: true, message: "Làm ơn nhập tiêu đề!" }]}
        >
          <Input 
            placeholder="Nhập tiêu đề"
          />
        </Form.Item>
        <Form.Item name="Description" label="Mô tả tour">
          <TextEditor
            placeholder="Nhập mô tả"
            initialValues={form?.getFieldValue("Description")}
            onChange={(value: any) => {
              form.setFieldValue("Description", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="Book_BookType"
          label="Loại sách"
        >
          <Space className="dk-w-full dk-flex">
            <Select
              placeholder="Chưa có thông tin loại sách"
              mode="multiple"
              className="dk-w-full dk-flex"
              options={bookTypes?.map((ob: BookType) => {
                return { value: ob.BookTypeId, label: ob.Name, ob: ob };
              })}
              onChange={async (value: any) => {
                const dataFilter: BookType[] = bookTypes.filter(
                  (ob: BookType) =>
                    value?.find((el: any) => el === ob.BookTypeId)
                );
                const record = (await form.validateFields()) as Book;
                const data = record
                  ? dataFilter.map(
                      (el: BookType) =>
                        new Book_BookType(
                          record.BookId,
                          el.BookTypeId,
                          record,
                          el
                        )
                    )
                  : [];
                form.setFieldValue("Book_BookType", data);
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item
          name="ISBN"
          label="ISBN"
          rules={[{ required: true, message: "Làm ơn nhập ISBN!" }]}
        >
          <Input 
            placeholder="Nhập ISBN"
          />
        </Form.Item>
        <Form.Item
          name="Quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Làm ơn nhập số lượng!" }]}
        >
          <Input 
            placeholder="Nhập số lượng"
          />
        </Form.Item>
        <Form.Item
          name="Location"
          label="Vị trí"
          rules={[{ required: true, message: "Làm ơn nhập vị trí!" }]}
        >
          <Input 
            placeholder="Nhập vị trí"
          />
        </Form.Item>
        <Form.Item
          name="PublicYear"
          label="Năm xuất bản"
          className="dk-w-full"
          rules={[
            { required: true, message: "Làm ơn nhập thời gian xuất bản" },
          ]}
          valuePropName="date"
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("PublicYear", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="Img"
          label="Ảnh đại diện"
          className="dk-w-full dk-flex dk-justify-center"
          rules={[{ required: true, message: "Làm ơn nhập ảnh đại diện" }]}
        >
          <UploadFileImage lengthMaxImage={1} form={form} keyField="Img" />
        </Form.Item>
        <Form.Item
          name="Barcode"
          label="Mã sách"
          className="dk-w-full"
          rules={[{ required: true, message: "Làm ơn nhập mã sách" }]}
        >
          <Input 
            placeholder="Nhập mã sách"
          />
        </Form.Item>
        <Form.Item
          name="AuthorId"
          label="Tác giả"
          className="dk-w-full"
          rules={[{ required: true, message: "Làm ơn chọn tác giả" }]}
        >
          <Select
            placeholder="Chọn thông tin tác giả"
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
          rules={[{ required: true, message: "Làm ơn chọn nhà xuất bản" }]}
        >
          <Select
            placeholder="Chọn nhà xuất bản"
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
  const {
    Authors,
    Publishers,
    BookTypes,
    Save,
    Form,
    Books,
    setBook,
    setPopup,
  } = props;

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
        Tạo sách mới
      </Button>
      <CollectionCreateForm
        open={open}
        authors={Authors}
        publishers={Publishers}
        bookTypes={BookTypes}
        save={Save}
        form={Form}
        books={Books}
        setBook={setBook}
        setPopup={setPopup}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddRecord;
