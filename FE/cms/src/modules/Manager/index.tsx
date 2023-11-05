import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAllBook, getAllBookWithType } from "services/book-services";
import { Book } from "Models/Book";

interface DataType {
  key: string;
  name: string;
  money: string;
  address: string;
}

const Manager: React.FC = () => {
  const [books, setBook] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Book) => record?.BookId?.toString() === editingKey;

  const columns: ColumnsType<Book> = [
    {
      title: "Tiêu đề",
      dataIndex: "Title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Kiểu sách",
      className: "column-money",
      dataIndex: "BookType",
      align: "left",
      render: (text) => <a>{text?.Name}</a>,
    },
    {
      title: "ISBN",
      className: "column-money",
      dataIndex: "ISBN",
      align: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số lượng",
      className: "column-money",
      dataIndex: "Quantity",
      align: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vị trí",
      className: "column-money",
      dataIndex: "Location",
      align: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Năm xuất bản",
      className: "column-money",
      dataIndex: "PublisherYear",
      align: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ảnh đại diện",
      className: "column-money",
      dataIndex: "Img",
      align: "left",
      render: (text) => <a><img src={text} className="dk-w-[150px] dk-aspect-[3/4]"/></a>,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Book) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
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
        );
      },
    },
  ];

  const save = async (key: React.Key) => {};

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Book, key: string) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.BookId?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllBookWithType();
      if (result && result?.data) {
        setBook(result?.data);
      }
    } catch (e) {}
  };

  return (
    <Table
      columns={columns}
      dataSource={books}
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
  );
};

export default Manager;
