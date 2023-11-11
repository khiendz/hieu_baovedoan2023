import React, { useEffect, useState } from "react";
import { Form, Popconfirm, Table, Typography } from "antd";
import {
  getAllBookType,
  getAllBookWithRelative,
  getAllAuthor,
  getAllPublisher,
  UpdateBook,
  DeleteBook,
} from "services";
import { Book } from "Models/Book";
import "./style.scss";
import { format } from "date-fns";
import { Book_BookType } from "Models/Book_BookType";
import { Publisher } from "Models/Publisher";
import { Author } from "Models/Author";
import { EditableCell } from "./EdittableCell";
import { BookType } from "Models/BookType";

const ManagerBook: React.FC = () => {
  const [bookTypes, setBookType] = useState([]);
  const [books, setBook] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Book) => record?.BookId?.toString() === editingKey;

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "Title",
      render: (title: any) => (
        <a className="dk-font-Inter dk-text-sm dk-font-semibold">{title}</a>
      ),
      editable: true,
    },
    {
      title: "Loại sách",
      className: "column-money",
      dataIndex: "Book_BookType",
      inputType: "Select",
      render: (bookType: Book_BookType[]) => (
        <span className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {bookTypes
            .filter((ob: BookType) =>
              bookType.find(
                (el: Book_BookType) => el.BookTypeId == ob.BookTypeId
              )
            )
            .map((ob: BookType) => ob?.Name)
            ?.join(", ")}
        </span>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "ISBN",
      className: "column-money",
      dataIndex: "ISBN",
      editable: true,
      align: "left",
    },
    {
      title: "Số lượng",
      className: "column-money",
      dataIndex: "Quantity",
      editable: true,
      align: "left",
    },
    {
      title: "Vị trí",
      className: "column-money",
      dataIndex: "Location",
      editable: true,
      align: "left",
    },
    {
      title: "Năm xuất bản",
      className: "column-money",
      dataIndex: "PublicYear",
      render: (date: any) => {
        const timer = new Date(date);
        return <p>{format(timer, "dd-MM-yyyy")}</p>;
      },
      editable: true,
      align: "left",
    },
    {
      title: "Ảnh đại diện",
      className: "column-money",
      dataIndex: "Img",
      render: (img: any) => (
        <img src={img} className="dk-w-[150px] dk-aspect-[3/4]" />
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Mã sách",
      className: "column-money",
      dataIndex: "Barcode",
      editable: true,
      align: "left",
    },
    {
      title: "Nhà xuất bản",
      className: "column-money",
      dataIndex: "Publisher",
      inputType: "Select",
      render: (publisher: Publisher) => (
        <span className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {publisher?.Name}
        </span>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Tác giả",
      className: "column-money",
      dataIndex: "Author",
      inputType: "Select",
      render: (author: Author) => (
        <span className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {author?.Name}
        </span>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      render: (_: any, record: Book) => {
        const editable = isEditing(record);
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.BookId)}
            >
              <a>Delete</a>
            </Popconfirm>
            {editable ? (
              <span className="dk-block dk-w-[88px] dk-font-semibold">
                <Typography.Link
                  onClick={() => save(record?.BookId || "")}
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
                onClick={() => edit(record, record.BookId?.toString() || "")}
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        bookTypes: bookTypes,
        authors: authors,
        publishers: publishers,
        form: form,
      }),
    };
  });

  const changeBook = async (book: Book) => {
    try {
      const result = await UpdateBook(book);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const clearTheBook = async (bookId: number) => {
    if (!bookId) return null;

    try {
      const result = await DeleteBook(bookId);
      if (result) return result?.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Book;
      const newData = [...books];
      const index = newData.findIndex((item) => key === item.BookId);
      if (index > -1) {
        const item = newData[index];
        const newBook = { ...item, ...row };
        const result = changeBook(newBook);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setBook(newData);
        setEditingKey("");
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

  const handleDelete = async (key: number) => {
    const result = await clearTheBook(key);
    const newData = books.filter((item: Book) => item.BookId !== key);
    setBook(newData);
  };

  const edit = (record: Book, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.BookId?.toString() || "");
  };

  useEffect(() => {
    initData();
    initBookType();
    initAuthor();
    initPublisher();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllBookWithRelative();
      if (result && result?.data) {
        setBook(result?.data);
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

  return books && bookTypes ? (
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        dataSource={books}
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

export default ManagerBook;
