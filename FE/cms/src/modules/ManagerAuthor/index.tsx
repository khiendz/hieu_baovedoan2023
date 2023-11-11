import React, { useEffect, useState } from "react";
import {
  Form,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import {
  getAllAuthor,
  UpdateAuthor,
  UpdateBook
} from "services";
import { Book } from "Models/Book";
import "./style.scss";
import { Publisher } from "Models/Publisher";
import { Author } from "Models/Author";
import { EditableCell } from "./EdittableCell";

const ManagerAuthor: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Author) => record?.AuthorId?.toString() === editingKey;

  const columns = [
    {
      title: "Tên tác giả",
      dataIndex: "Name",
      render: (name: string) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</p>
      ),
      editable: true,
    },
    {
      title: "Mô tả",
      className: "column-money",
      dataIndex: "Description",
      render: (description: string) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold">{description}</p>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      render: (_: any, record: Author) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="dk-block dk-w-[88px] dk-font-semibold">
            <Typography.Link
              onClick={() => save(record?.AuthorId || "")}
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
            onClick={() => edit(record, record.AuthorId?.toString() || "")}
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
    
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        authors: authors,
        form: form
      }),
    };
  });

  const changeAuthor = async (author: Author) => {
    try {
      const result = await UpdateAuthor(author);
      if (result) 
        return result?.data;
      else 
        return null;
    } catch (e) 
    {
      console.log(e);
      return null;
    }
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Author;
      const newData = [...authors];
      const index = newData.findIndex((item) => key === item.AuthorId);
      if (index > -1) {
        const item = newData[index];
        const newBook = {...item,...row};
        const result = changeAuthor(newBook);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setAuthors(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setAuthors(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Author, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.AuthorId?.toString() || "");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
        const result = await getAllAuthor();
        if (result) {
          setAuthors(result.data);
        }
      } catch (e) {}
  };

  return authors ? (
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        dataSource={authors}
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

export default ManagerAuthor;
