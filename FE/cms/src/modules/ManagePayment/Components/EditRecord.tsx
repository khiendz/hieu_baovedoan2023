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
import format from "date-fns/format";
import { useAppContext } from "hook/use-app-context";
import { LateFee } from "Models";

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
  const { data: lateFees, setData: setLateFees } = useAppContext("late-fees");
  return (
    <Modal
      open={open}
      title="Cập nhật thông tin thanh toán"
      okText="Cật nhật thanh toán"
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
          name="LateFeeId"
          label="Phí trễ hạn"
          rules={[{ required: true, message: "Làm ơn nhập phí trễ hạn" }]}
        >
          <Select
            placeholder="Chọn thông tin phí trễ hạn"
            className="dk-w-full dk-h-fit"
            options={[
              ...lateFees?.map((ob: LateFee) => {
                return {
                  value: ob.LateFeeId,
                  label: (
                    <div className="dk-flex dk-flex-col dk-line-clamp-1 dk-border-b-[2px] dk-pb-4 dk-overflow-hidden">
                      <div className="dk-font-Roboto dk-font-bold">
                        Mã trễ hạn:{" "}
                        <span className="dk-font-normal">{ob.LateFeeId}</span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Tên người mượn:{" "}
                        <span className="dk-font-normal">
                          {ob.BorrowedBook.Member.Name}
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Ngày mượn:{" "}
                        <span className="dk-font-normal">
                          {format(
                            ob.BorrowedBook?.BorrowDate
                              ? new Date(ob.BorrowedBook?.BorrowDate)
                              : new Date(),
                            "dd-MM-yyyy"
                          )}
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Hạn trả:{" "}
                        <span className="dk-font-normal">
                          {format(
                            ob.BorrowedBook?.DueDate
                              ? new Date(ob.BorrowedBook?.DueDate)
                              : new Date(),
                            "dd-MM-yyyy"
                          )}
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Ngày trả:{" "}
                        <span className="dk-font-normal">
                          {ob.BorrowedBook?.ReturnDate
                            ? format(
                                ob.BorrowedBook?.ReturnDate
                                  ? new Date(ob.BorrowedBook?.ReturnDate)
                                  : new Date(),
                                "dd-MM-yyyy"
                              )
                            : "Chưa trả"}
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Tên sách:{" "}
                        <span className="dk-font-normal">
                          {ob.BorrowedBook.Book.Title}
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Mã mượn:{" "}
                        <span className="dk-font-normal">
                          {ob.BorrowedBook.TransactionId}
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Số ngày trễ hạn:{" "}
                        <span className="dk-font-normal">
                          {ob.BorrowedBook.DueDate
                            ? new Date().getDate() -
                              new Date(ob?.BorrowedBook.DueDate)?.getDate()
                            : 0}
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Tổng tiền trễ hạn theo loại trễ hạn:{" "}
                        <span className="dk-font-normal">
                          {new Date().getDate() -
                            new Date(
                              ob?.BorrowedBook.DueDate || ""
                            )?.getDate() >=
                          ob.BorrowedBook.Book.LateFeeType.DateCount
                            ? (
                                ob.BorrowedBook.Book.LateFeeType.FeeAmount *
                                ((new Date().getDate() -
                                  new Date(
                                    ob?.BorrowedBook.DueDate || ""
                                  )?.getDate()) /
                                  ob.BorrowedBook.Book.LateFeeType.DateCount)
                              ).toLocaleString("vi-VN")
                            : 0}{" "}
                          VND
                        </span>
                      </div>
                      <div className="dk-font-Roboto dk-font-bold">
                        Mô tả loại trễ hạn:{" "}
                        <span className="dk-font-normal">
                          {ob.BorrowedBook.Book.LateFeeType.Description}
                        </span>
                      </div>
                    </div>
                  ),
                  ob: ob,
                };
              }),
            ]}
            onChange={(value) => {
              form.setFieldValue("LateFeeId", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="PaymentDate"
          label="Ngày thanh toán"
          rules={[{ required: true, message: "Làm ơn nhập ngày thanh toán" }]}
          valuePropName="date"
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            className="dk-w-full"
            onChange={(value) => {
              form.setFieldValue("PaymentDate", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="Amount"
          label="Tổng tiền thanh toán"
          rules={[
            { required: true, message: "Làm ơn nhập tổng tiền thanh toán" },
          ]}
        >
          <Input type="nunber" />
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
        Sửa thông tin thanh toán
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
