import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  InputRef,
  Popconfirm,
  Table,
  Typography,
  Input,
  Space,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  getAllBookType,
  getAllBookWithRelative,
  getAllAuthor,
  getAllPublisher,
  UpdateBook,
  DeleteBook,
  AddBook,
} from "services";
import { Book } from "Models/Book";
import "./style.scss";
import { format } from "date-fns";
import { Book_BookType } from "Models/Book_BookType";
import { Publisher } from "Models/Publisher";
import { Author } from "Models/Author";
import { EditableCell } from "./EdittableCell";
import { BookType } from "Models/BookType";
import AddRecord from "./Component/AddRecord";
import type {
  ColumnType,
} from "antd/es/table/interface";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { BorrowedBook } from "Models/BorrowedBook";
import { AddBorrowedBook, DeleteBorrowedBook, UpdateBorrowedBook, getAllBorrowedBook } from "services/borrowedBook-services";
import { Member } from "Models/Member";
import { getAllMember } from "services/member-services";

type DataIndex = keyof Book;

const ManagerBorrowedBook: React.FC = () => {
  const [borrowedBooks,setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [books, setBook] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: BorrowedBook) => record?.TransactionId?.toString() === editingKey;

  const columns = [
    {
      title: "Tên sách",
      dataIndex: "BookId",
      render: (bookId: number) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{
          books.filter(ob => ob.BookId === bookId)[0]?.Title
        }</p>
      ),
      editable: true,
    },
    {
      title: "Tên người mượn sách",
      dataIndex: "MemberId",
      render: (memberId: number, record: BorrowedBook) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{
          members.filter(ob => ob.MemberId === memberId)[0]?.Name
        }</p>
      ),
      editable: true,
    },
    {
      title: "Mã giao dịch",
      dataIndex: "TransactionId",
      render: (transactionID: number) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{
          transactionID
        }</p>
      ),
      editable: false,
    },
    {
      title: "Ngày mượn",
      dataIndex: "BorrowDate",
      render: (date: Date) => {
        const timer = new Date(date || new Date());
        return <p>{format(timer, "dd-MM-yyyy")}</p>;
      },
      editable: true,
    },
    {
      title: "Hạn trả",
      dataIndex: "DueDate",
      render: (date: Date) => {
        const timer = new Date(date || new Date());
        return <p>{format(timer, "dd-MM-yyyy")}</p>;
      },
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      render: (_: any, record: BorrowedBook) => {
        const editable = isEditing(record);
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.TransactionId)}
            >
              <a>Delete</a>
            </Popconfirm>
            {editable ? (
              <span className="dk-block dk-w-[88px] dk-font-semibold">
                <Typography.Link
                  onClick={() => save(record?.TransactionId || "")}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record, record.TransactionId?.toString() || "")}
              >
                Edit
              </Typography.Link>
            )}
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";
    switch (col.dataIndex) {
      case "Book_BookType":
        inputType = "select";
        break;
      case "Author":
        inputType = "select";
        break;
      case "Publisher":
        inputType = "select";
        break;
      case "PublicYear":
        inputType = "date";
        break;
      default:
        inputType = "text";
        break;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: inputType,
        members: members,
        books: books,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        form: form,
      }),
    };
  });

  const changeBorrowedBook = async (borrowedBook: BorrowedBook) => {
    try {
      const result = await UpdateBorrowedBook(borrowedBook);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleAddBorrowedBook = async (borrowedBook: BorrowedBook) => {
    try {
      const result = await AddBorrowedBook(borrowedBook);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const clearTheBorrewedBook = async (borrowedBookId: number) => {
    if (!borrowedBookId) return null;

    try {
      const result = await DeleteBorrowedBook(borrowedBookId);
      if (result) return result?.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as BorrowedBook;
      const newData = [...borrowedBooks];
      const index = newData.findIndex((item) => key === item.TransactionId);
      if (index > -1) {
        const item = newData[index];
        const newBook = { ...item, ...row };
        const result = changeBorrowedBook(newBook);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setBorrowedBooks(newData);
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

  const handleDelete = async (key: number) => {
    const result = await clearTheBorrewedBook(key);
    const newData = borrowedBooks.filter((item: BorrowedBook) => item.TransactionId !== key);
    setBorrowedBooks(newData);
  };

  const handleAdd = async (borrowedBook: BorrowedBook) => {
    const result = await handleAddBorrowedBook(borrowedBook);
    setBorrowedBooks([{ ...borrowedBook, TransactionId: borrowedBooks.length + 1 }, ...borrowedBooks]);
  };

  const edit = (record: BorrowedBook, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.TransactionId?.toString() || "");
  };

  useEffect(() => {
    initData();
    initBorrowedBook();
    initMember();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllBookWithRelative();
      if (result && result?.data) {
        setBook(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initBorrowedBook = async () => {
    try {
      const result = await getAllBorrowedBook();
      if (result) {
        setBorrowedBooks(result.data);
      }
    } catch (e) {}
  }

  const initMember = async () => {
    try {
      const result = await getAllMember();
      if (result) {
        setMembers(result.data);
      }
    } catch (e) {}
  }


  return borrowedBooks ? (
    <Form form={form} component={false}>
      <AddRecord
        Members={members}
        BorrowedBooks={borrowedBooks}
        Save={handleAdd}
        Form={form}
        Books={books}
      />
      <Table
        columns={mergedColumns}
        dataSource={borrowedBooks}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        rowClassName="editable-row"
        bordered
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
  ) : null;
};

export default ManagerBorrowedBook;
