import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { BorrowedBook } from "Models";
import { useAppContext } from "hook/use-app-context";

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
  const { data: borrowedBooks } = useAppContext("borrowed-books");
  return (
    <Modal
      open={open}
      title="Cập nhật thông tin trễ hạn"
      okText="Cật nhật loại trễ hạn"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
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
          name="TransactionId"
          label="Giao dịch"
          rules={[{ required: true, message: "Làm ơn chọn giao dịch" }]}
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
        Sửa thông tin trễ hạn
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
