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
          rules={[
            { required: true, message: "Làm ơn chọn thông tin thuê sách" },
          ]}
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
                            ( lateFees?.length > 0 ? 
                              (lateFees as LateFee[]).find(
                                (lateFee: LateFee) =>
                                lateFee.BorrowedBook.TransactionId !=
                                ob.TransactionId
                            ) : true)
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
    Form.resetFields();
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
