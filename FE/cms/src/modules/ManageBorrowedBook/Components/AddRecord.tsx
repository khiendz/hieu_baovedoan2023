import React, { useState } from "react";
import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import { BorrowedBook } from "Models";
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
  const { data: borrowedBooks, setData: setBorrowedBooks } =
  useAppContext("borrowed-books");

  return (
    <Modal
      open={open}
      title="Thêm mới mượn sách"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as BorrowedBook;
        const result = await save(
          {
            ...row,
          },
          setBorrowedBooks,
          borrowedBooks
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
          name="MemberId"
          label="Thành viên mượn"
          rules={[{ required: true, message: "Làm ơn chọn thành viên mượn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="BookId"
          label="Sách mượn"
          rules={[{ required: true, message: "Làm ơn chọn sách mượn" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="BorrowedDate"
          label="Ngày mượn"
          rules={[{ required: true, message: "Làm ơn nhập ngày mượn" }]}
          valuePropName="date"
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("BorrowedDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="DueDate"
          label="Hạn trả"
          rules={[{ required: true, message: "Làm ơn nhập hạn trả" }]}
        >
           <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("DueDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="ReturnDate"
          label="Ngày trả"
        >
           <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(new Date())}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("ReturnDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="KateFee"
          label="Phí trễ hạn"
        >
          <Input type="number"/>
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
        Thêm sách mượn
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
