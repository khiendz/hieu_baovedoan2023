import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeLateFee } from "./services";
import { useAppContext } from "hook/use-app-context";
import { BorrowedBook, LateFee } from "Models";
import { AddLateFee, getAllLateFee } from "services/late-fee-service";
import { getAllBorrowedBook } from "services/borrowedBook-services";

const ManageLateFee = () => {
  const { data: lateFees, setData: setLateFees } = useAppContext("late-fees");
  const { data: borrowedBooks, setData: setBorrowedBooks } =
    useAppContext("borrowed-books");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setLateFees([]);
    setBorrowedBooks([]);
    initData();
    initBorrowedBook();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  useEffect(() => {
    if (borrowedBooks && lateFees) {
      const lates = borrowedBooks?.filter(
        (ob: BorrowedBook) =>
          ob.ReturnDate == null &&
          new Date().getTime() > new Date(ob?.DueDate || "").getTime() &&
          (lateFees?.length > 0
            ? (lateFees as LateFee[]).find(
                (lateFee: LateFee) =>
                  lateFee.BorrowedBook.TransactionId != ob.TransactionId
              )
            : true)
      );

      if (lates.length > 0) {
        for (let index = 0; index < lates.length; index++) {
          const element = lates[index] as BorrowedBook;
          let lateFee = {} as LateFee;
          lateFee.FeeAmount = element.Book.LateFeeType.FeeAmount *
            Math.floor(
              (new Date().getTime() -
                new Date(element?.DueDate || "").getTime()) /
                (1000 * 60 * 60 * 24) /
                element.Book.LateFeeType.DateCount
            );
          lateFee.TransactionId = element.TransactionId;
          handleAddLateFee(lateFee);
        }
        initData();
        initBorrowedBook();
      }
    }
  }, [borrowedBooks, lateFees]);

  const handleAddLateFee = async (lateFee: LateFee) => {
    await AddLateFee(lateFee);
  }

  const isEditing = (record: LateFee) =>
    record?.LateFeeId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as LateFee;
      const newData = [...lateFees];
      const index = newData.findIndex((item) => key === item.LateFeeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeLateFee(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setLateFees(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setLateFees(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: LateFee, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.LateFeeId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllLateFee();
      if (result && result?.data) {
        setLateFees(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initBorrowedBook = async () => {
    try {
      const result = await getAllBorrowedBook();
      if (result && result?.data) {
        setBorrowedBooks(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const columns = Columns(
    setSearchText,
    setSearchedColumn,
    searchInput,
    searchedColumn,
    searchText,
    isEditing,
    edit,
    save,
    cancel,
    form,
    handleDelete,
    setLateFees,
    setPopup,
    lateFees
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return lateFees ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={lateFees}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageLateFee;
