import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Select,
  DatePicker,
  Space
} from "antd";
import { getAllBookType, getAllBookWithType } from "services";
import { Book } from "Models/Book";
import "./style.scss";
import { BookType } from "Models/BookType";
import { format } from "date-fns";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "date" | "text" | "select";
  bookTypes: BookType[];
  record: Book;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  bookTypes,
  record,
  index,
  children,
  ...restProps
}) => {
  const arrayBookType = bookTypes?.map((ob: BookType) => {
    return { value: ob.BookTypeID, label: ob.Name };
  });
  let inputNode = null;

  switch (inputType) {
    case "select":
      inputNode = (
        <Select
          defaultValue={record?.BookType?.Name}
          options={[...arrayBookType]}
        />
      );
      break;
    case "date": 
        inputNode = (
          <Space direction="vertical" size={12}>
            <DatePicker format={"DD-MM-YYYY"}/>
          </Space>
        )
        break;
    default:
      inputNode = <Input />;
      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Manager: React.FC = () => {
  const [bookTypes, setBookType] = useState([]);
  const [books, setBook] = useState([]);
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
      dataIndex: "BookType",
      inputType: "Select",
      render: (bookType: BookType) => <span>{bookType.Name}</span>,
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

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";
    switch (col.dataIndex) {
      case "BookType":
        inputType = "select";
        break;
      case "PublicYear":
        inputType = "date"
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
      }),
    };
  });

  const save = async (key: React.Key) => {};

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
    initData();
    initBookType();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllBookWithType();
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

export default Manager;
