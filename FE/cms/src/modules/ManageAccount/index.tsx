import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import { Account } from "Models";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeAccount } from "./services";
import { useAppContext } from "hook/use-app-context";
import { getAllAccount, getAllRoleAccount, getAllUser } from "services";

const ManageAccount = () => {
  const { data: accounts, setData: setAccounts } = useAppContext("accounts");
  const { data: roleAccounts, setData: setRoleAccounts } = useAppContext("role-accounts");
  const { data: users, setData: setUsers } = useAppContext("users");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setAccounts([]);
    setRoleAccounts([]);
    initData();
    initRoleAccount();
    initUser();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: Account) =>
    record?.AccountId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Account;
      const newData = [...accounts];
      const index = newData.findIndex((item) => key === item.AccountId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeAccount(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setAccounts(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setAccounts(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Account, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.AccountId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllAccount();
      if (result && result?.data) {
        setAccounts(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initRoleAccount = async () => {
    try {
      const result = await getAllRoleAccount();
      if (result && result?.data) {
        setRoleAccounts(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const initUser = async () => {
    try {
      const result = await getAllUser();
      if (result && result?.data) {
        setUsers(result?.data?.reverse());
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
    setAccounts,
    setPopup,
    accounts
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return accounts ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={accounts}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageAccount;
