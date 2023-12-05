import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeUser } from "./services";
import { useAppContext } from "hook/use-app-context";
import { User } from "Models";
import { getAllAccount, getAllUser } from "services";

const ManageUser = () => {
  const { data: users, setData: setUsers } = useAppContext("users");
  const { data: accounts, setData: setAccounts } = useAppContext("accounts");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setUsers([]);
    setAccounts([]);
    initData();
    initAccount();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: User) => record?.UserId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as User;
      const newData = [...users];
      const index = newData.findIndex((item) => key === item.UserId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row, };
        const result = await changeUser(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setUsers(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setUsers(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: User, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.UserId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllUser();
      if (result && result?.data) {
        setUsers(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initAccount = async () => {
    try {
      const result = await getAllAccount();
      if (result && result?.data) {
        setAccounts(result?.data?.reverse());
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
    setUsers,
    setPopup,
    users,
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return users ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={users}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageUser;
