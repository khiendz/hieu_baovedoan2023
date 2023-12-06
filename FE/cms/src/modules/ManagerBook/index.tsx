import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import {
  getAllBookType,
  getAllBookWithRelative,
  getAllAuthor,
  getAllPublisher,
} from "services";
import { Book } from "Models/Book";
import "./style.scss";
import { Publisher } from "Models/Publisher";
import { Author } from "Models/Author";
import AddRecord from "./Component/AddRecord";
import Columns from "./Component/Columns";
import MergedColumns from "./Component/MergeColumn";
import { changeBook, handleAdd, handleDelete } from "./Services";
import NotifYPopup from "components/NotifyPopup";
import { useAppContext } from "hook/use-app-context";
import { getAllLateFeeType } from "services/late-fee-type";

const ManagerBook: React.FC = () => {
  const { setData: setPopup } = useAppContext("popup-message");
  const { data: bookTypes, setData: setBookType } = useAppContext('book-types');
  const { data: books, setData: setBook } = useAppContext('books');
  const { data: lateFeeTypes, setData: setLateFeeTypes } = useAppContext('late-fee-types');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const isEditing = (record: Book) => record?.BookId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Book;
      const newData = [...books];
      const index = newData.findIndex((item) => key === item.BookId);
      if (index > -1) {
        const item = newData[index];
        const newBook = { ...item, ...row };
        const result = await changeBook(newBook);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        newData.splice(index, 1, {
          ...item,
          ...result.data,
        });
        setBook(newData);
        setEditingKey("");
        initData();
        initBookType();
        initAuthor();
        initPublisher();
      } else {
        newData.push(row);
        setBook(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Book, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.BookId?.toString() || "");
  };

  useEffect(() => {
    setBook([]);
    setBookType([]);
    setLateFeeTypes([]);
    initData();
    initBookType();
    initLateFeeTypes();
    initAuthor();
    initPublisher();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllBookWithRelative();
      if (result && result?.data) {
        setBook(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initBookType = async () => {
    try {
      const result = await getAllBookType();
      if (result) {
        setBookType(result.data);
      }
    } catch (e) {}
  };

  const initAuthor = async () => {
    try {
      const result = await getAllAuthor();
      if (result) {
        setAuthors(result.data);
      }
    } catch (e) {}
  };

  const initPublisher = async () => {
    try {
      const result = await getAllPublisher();
      if (result) {
        setPublishers(result.data);
      }
    } catch (e) {}
  };

  const initLateFeeTypes = async () => {
    try {
      const result = await getAllLateFeeType();
      if (result) {
        setLateFeeTypes(result.data);
      }
    } catch (e) {}
  };

  const columns = Columns(
    setSearchText,
    setSearchedColumn,
    searchInput,
    searchedColumn,
    searchText,
    books,
    authors,
    bookTypes,
    publishers,
    isEditing,
    edit,
    save,
    cancel,
    form,
    handleDelete,
    setBook,
    setPopup
  );

  const mergedColumns = MergedColumns(
    columns,
    isEditing,
    bookTypes,
    authors,
    publishers,
    form
  );

  return books && bookTypes ? (
    <>
      <Form form={form} component={false}>
        <AddRecord
          Authors={authors}
          Publishers={publishers}
          BookTypes={bookTypes}
          Save={handleAdd}
          Form={form}
          Books={books}
          setBook={setBook}
          setPopup={setPopup}
        />
        <Table
          columns={mergedColumns}
          dataSource={books}
          rowClassName="editable-row"
          bordered
          scroll={{ x: 1600, y: 700 }}
          title={() => (
            <p className="dk-font-Inter dk-font-semibold dk-text-[14xp]">
              {"Danh sách các loại sách đang có trong thư viện"}
            </p>
          )}
          footer={() => (
            <p className="dk-font-Inter dk-font-semibold dk-text-[14xp]">
              {"Sách là tri thức của nhân loại"}
            </p>
          )}
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManagerBook;
