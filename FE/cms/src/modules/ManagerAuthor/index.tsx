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
  getAllAuthor,
  AddAuthor,
  DeleteAuthor,
  UpdateAuthor,
} from "services";
import { Book } from "Models/Book";
import "./style.scss";
import { Author } from "Models/Author";
import { EditableCell } from "./EdittableCell";
import AddRecord from "./Component/AddRecord";
import type {
  ColumnType,
} from "antd/es/table/interface";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

type DataIndex = keyof Book;

const ManagerBook: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const isEditing = (record: Author) => record?.AuthorId?.toString() === editingKey;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Author> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Tên tác giả",
      dataIndex: "Name",
      ...getColumnSearchProps("Title"),
      render: (title: string) => (
        <p className="dk-font-Inter dk-text-sm dk-font-semibold dk-w-fit dk-min-w-[300px]">{title}</p>
      ),
      editable: true,
    },
    {
      title: "Mô tả",
      className: "column-money",
      dataIndex: "Description",
      ...getColumnSearchProps("Book_BookType"),
      render: (description: string) => (
        <p className="dk-font-Inter dk-text-sm dk-font-medium">{description}</p>
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
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff] dk-w-[150px]">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.AuthorId)}
            >
              <a>Delete</a>
            </Popconfirm>
            {editable ? (
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
        authors: authors,
        form: form,
      }),
    };
  });

  const changeBook = async (author: Author) => {
    try {
      const result = await UpdateAuthor(author);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleAddAuthor = async (author: Author) => {
    try {
      const result = await AddAuthor(author);
      if (result) return result?.data;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const clearTheAuthor = async (authorId: number) => {
    if (!authorId) return null;

    try {
      const result = await DeleteAuthor(authorId);
      if (result) return result?.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Author;
      const newData = [...authors];
      const index = newData.findIndex((item) => key === item.AuthorId);
      if (index > -1) {
        const item = newData[index];
        const newBook = { ...item, ...row };
        const result = changeBook(newBook);
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

  const handleDelete = async (key: number) => {
    const result = await clearTheAuthor(key);
    const newData = authors.filter((item: Author) => item.AuthorId !== key);
    setAuthors(newData);
  };

  const handleAdd = async (author: Author) => {
    const result = await handleAddAuthor(author);
    setAuthors([{ ...author, AuthorId: authors.length + 1 }, ...authors]);
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
        setAuthors(result.data.reverse());
      }
    } catch (e) {}
  };

  return authors ? (
    <Form form={form} component={false}>
      <AddRecord
        Authors={authors}
        Save={handleAdd}
        Form={form}
      />
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

export default ManagerBook;
