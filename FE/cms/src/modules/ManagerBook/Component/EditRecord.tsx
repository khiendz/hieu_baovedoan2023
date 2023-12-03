import React, { useState, useEffect } from "react";
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
  record: Book;
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
  onInit: any;
  Cancel: any;
  record: Book;
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
  record,
}) => {
  form?.setFieldValue(
    "PublicYear",
    form?.getFieldValue("PublicYear")
      ? dayjs(form?.getFieldValue("PublicYear"))
      : dayjs(new Date())
  );

  return (
    <Modal
      open={open}
      title="Sửa thông tin sách mới"
      okText="Cập nhật sách"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        await save();
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
        <Form.Item name="Description" label="Mô tả tour">
          <TextEditor
            initialValues={form?.getFieldValue("Description")}
            onChange={(value: any) => {
              form.setFieldValue("Description", value);
            }}
          />
        </Form.Item>
        <Form.Item name="Book_BookType" label="Loại sách">
          <Space className="dk-w-full dk-flex">
            <Select
              mode="multiple"
              className="dk-w-full dk-flex"
              defaultValue={() => {
                const arrayBookType = bookTypes.map((ob: BookType) => {
                  return { value: ob.BookTypeId, label: ob.Name, ob: ob };
                });
                return arrayBookType.filter((ob) =>
                  record.Book_BookType.find((ele) => ele.BookTypeId == ob.value)
                );
              }}
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
          <Input />
        </Form.Item>
        <Form.Item
          name="Quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Làm ơn nhập số lượng!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Location"
          label="Vị trí"
          rules={[{ required: true, message: "Làm ơn nhập vị trí!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="PublicYear" label="Năm xuất bản" className="dk-w-full">
          <Space className="dk-w-full">
            <DatePicker
              format={"DD-MM-YYYY"}
              defaultValue={record?.PublicYear ? dayjs(new Date(record?.PublicYear)) : dayjs(new Date())}
              className="dk-w-full"
              onChange={(value) => {
                form.setFieldValue("PublicYear", value);
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item name="Img" label="Ảnh đại diện" className="dk-w-full">
          <Form.Item
            name="Img"
            label="Ảnh đại diện"
            className="dk-w-full dk-flex dk-justify-center"
          >
            <UploadFileImage lengthMaxImage={1} form={form} keyField="Img" />
          </Form.Item>
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

const EditRecord: React.FC<Props> = (props) => {
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
    onInit,
    record,
    Cancel,
  } = props;

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
        Sửa thông tin sách
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
          Cancel();
          Form.resetFields();
        }}
        record={record}
      />
    </div>
  );
};

export default EditRecord;
