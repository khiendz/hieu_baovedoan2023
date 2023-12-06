import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useAppContext } from "hook/use-app-context";
import { Book, BorrowedBook, Member } from "Models";

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
  const { data: members } = useAppContext("members");
  const { data: books } = useAppContext("books");

  return (
    <Modal
      open={open}
      title="Cập nhật thông tin sách mượn"
      okText="Cật nhật sách mượn"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async () => {
        const row = (await form.validateFields()) as BorrowedBook;
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
          name="MemberId"
          label="Thành viên mượn"
          rules={[{ required: true, message: "Làm ơn chọn thành viên mượn" }]}
        >
          <Select
            placeholder="Chọn độc giả"
            className="dk-w-full"
            defaultValue={{
              value: form.getFieldValue("MemberId"),
              label: members.find(
                (member: Member) =>
                  member.MemberId == form.getFieldValue("MemberId")
              )?.Name,
            }}
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
        <Form.Item
          name="BookId"
          label="Sách mượn"
          rules={[{ required: true, message: "Làm ơn chọn sách mượn" }]}
        >
          <Select
            placeholder="Chọn sách"
            className="dk-w-full"
            defaultValue={{
              value: form.getFieldValue("BookId"),
              label: books.find(
                (book: Book) => book.BookId == form.getFieldValue("BookId")
              )?.Title,
            }}
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
          name="BorrowDate"
          label="Ngày mượn"
          rules={[
            { required: true, message: "Làm ơn nhập ngày mượn" },
          ]}
          valuePropName="date"
        >
          <DatePicker
            format="DD-MM-YYYY"
            className="dk-w-full"
            defaultValue={dayjs(form.getFieldsValue().BorrowDate) || null}
            onChange={(value) => {
              form.setFieldValue("BorrowDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="DueDate"
          label="Hạn trả"
          rules={[
            { required: true, message: "Làm ơn nhập hạn trả" },
          ]}
          valuePropName="date"
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(
              form.getFieldValue("DueDate") ? form.getFieldValue("DueDate") : 0
            )}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("DueDate", value);
            }}
          />
        </Form.Item>

        <Form.Item name="ReturnDate" label="Ngày trả" valuePropName="date">
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(
              form.getFieldValue("ReturnDate")
                ? form.getFieldValue("ReturnDate")
                : 0
            )}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("ReturnDate", value);
            }}
          />
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
        Sửa sách mượn
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
