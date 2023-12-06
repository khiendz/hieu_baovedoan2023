import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeBorrowedBook } from "./services";
import { useAppContext } from "hook/use-app-context";
import { BorrowedBook } from "Models";
import { getAllBorrowedBook } from "services/borrowedBook-services";
import { getAllMember } from "services/member-services";
import { getAllBook } from "services";

const ManageBorrowedBook = () => {
  const { data: borrowedBooks, setData: setBorrowedBooks } =
    useAppContext("borrowed-books");
  const { data: members, setData: setMembers } = useAppContext("members");
  const { data: books, setData: setBooks } = useAppContext("books");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setBorrowedBooks([]);
    setMembers([]);
    setBooks([]);
    initData();
    initMembers();
    initBooks();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: BorrowedBook) =>
    record?.TransactionId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as BorrowedBook;
      const newData = [...borrowedBooks];
      const index = newData.findIndex((item) => key === item.TransactionId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeBorrowedBook(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setBorrowedBooks(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setBorrowedBooks(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: BorrowedBook, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.TransactionId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllBorrowedBook();
      if (result && result?.data) {
        setBorrowedBooks(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initMembers = async () => {
    try {
      const result = await getAllMember();
      if (result && result?.data) {
        setMembers(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initBooks = async () => {
    try {
      const result = await getAllBook();
      if (result && result?.data) {
        setBooks(result?.data?.reverse());
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
    setBorrowedBooks,
    setPopup,
    borrowedBooks,
    members
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return borrowedBooks ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={borrowedBooks}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageBorrowedBook;
