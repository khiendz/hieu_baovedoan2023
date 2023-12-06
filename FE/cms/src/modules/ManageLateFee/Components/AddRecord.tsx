import React, { useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { BorrowedBook, LateFee } from "Models";
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
  const { data: borrowedBooks } = useAppContext("borrowed-books");
  const { data: lateFees, setData: setLateFees } = useAppContext("late-fees");
  return (
    <Modal
      open={open}
      title="Thêm mới trễ hạn"
      okText="Thêm mới"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={async (ob) => {
        const row = (await form.validateFields()) as LateFee;
        const result = await save(
          {
            ...row,
          },
          setLateFees,
          lateFees
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
          name="TransactionId"
          label="Thông tin thuê sách"
          rules={[{ required: true, message: "Làm ơn chọn thông tin thuê sách" }]}
        >
           <Select
            placeholder="Chọn thông tin thuê sách"
            className="dk-w-full dk-line-clamp-1"
            options={
              borrowedBooks
                ? [
                    ...borrowedBooks?.map((ob: BorrowedBook) => {
                      return {
                        value: ob?.TransactionId,
                        label: (
                          <div className="dk-flex dk-flex-col dk-line-clamp-1">
                            <span className="dk-font-Roboto dk-font-bold">
                              Tên người mượn:{" "}
                              <span className="dk-font-normal">
                                {ob.Member.Name}
                              </span>
                            </span>
                            <span className="dk-font-Roboto dk-font-bold">
                              Tên sách:{" "}
                              <span className="dk-font-normal">
                                {ob.Book.Title}
                              </span>
                            </span>
                            <span className="dk-font-Roboto dk-font-bold">
                              Mã mượn:{" "}
                              <span className="dk-font-normal">
                                {ob.TransactionId}
                              </span>
                            </span>
                          </div>
                        ),
                        ob: ob,
                      };
                    }),
                  ]
                : []
            }
            onChange={(value) => {
              form.setFieldValue("TransactionId", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="FeeAmount"
          label="Tổng phí trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập tổng phí trễ hạn" }]}
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
        Thêm thông tin trễ hạn
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
