import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal, Select } from "antd";
import { BorrowedBook, LateFee } from "Models";
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
  const { data: lateFees } = useAppContext("late-fees");
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
            className="dk-w-full dk-line-clamp-2 dk-h-fit"
            options={
              borrowedBooks
                ? [
                    ...borrowedBooks
                      ?.filter(
                        (ob: BorrowedBook) =>
                          ob.ReturnDate == null &&
                          new Date().getTime() >
                            new Date(ob?.DueDate || "").getTime() &&
                          (lateFees as LateFee[]).find(
                            (lateFee: LateFee) =>
                              lateFee.BorrowedBook.TransactionId !=
                              ob.TransactionId
                          )
                      )
                      ?.map((ob: BorrowedBook) => {
                        return {
                          value: ob?.TransactionId,
                          label: (
                            <div className="dk-flex dk-flex-col dk-line-clamp-1 dk-border-b-[1px] dk-pb-2 dk-overflow-hidden">
                              <div className="dk-font-Roboto dk-font-bold">
                                Tên người mượn:{" "}
                                <span className="dk-font-normal">
                                  {ob.Member.Name}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Tên sách:{" "}
                                <span className="dk-font-normal">
                                  {ob.Book.Title}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Mã mượn:{" "}
                                <span className="dk-font-normal">
                                  {ob.TransactionId}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Số ngày trễ hạn:{" "}
                                <span className="dk-font-normal">
                                  {ob.DueDate
                                    ? Math.floor(
                                        (new Date().getTime() -
                                          new Date(ob?.DueDate)?.getTime()) /
                                          (1000 * 60 * 60 * 24)
                                      )
                                    : 0}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Tổng tiền trễ hạn theo loại trễ hạn:{" "}
                                <span className="dk-font-normal">
                                  {ob.DueDate &&
                                  new Date() > new Date(ob.DueDate)
                                    ? (
                                        ob.Book.LateFeeType.FeeAmount *
                                        Math.floor(
                                          (new Date().getTime() -
                                            new Date(ob.DueDate).getTime()) /
                                            (1000 * 60 * 60 * 24) /
                                            ob.Book.LateFeeType.DateCount
                                        )
                                      ).toLocaleString("vi-VN")
                                    : 0}{" "}
                                  VND
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Mô tả loại trễ hạn:{" "}
                                <span className="dk-font-normal">
                                  {ob.Book.LateFeeType.Description}
                                </span>
                              </div>
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
          label="Tổng phí trễ hạn tạm tính"
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
