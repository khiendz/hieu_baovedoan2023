import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import "./style.scss";
import { useAppContext } from "hook/use-app-context";
import {
  getAllRoleAccount,
} from "services";
import MergedColumns from "./Component/MergedColumns";
import Columns from "./Component/Columns";
import {
  changeRoleAccount,
  handleAdd,
  handleDelete,
} from "./service";
import AddRecord from "./Component/AddRecord";
import { RoleAccount } from "Models";

export default function ManageRoleAccount() {
  const { data: roleAccounts, setData: setRoleAccounts } =
    useAppContext("role-accounts");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const isEditing = (record: RoleAccount) =>
    record?.RoleId?.toString() === editingKey;

  useEffect(() => {
    setRoleAccounts([]);
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
    initData();
  }, []);

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as RoleAccount;
      const newData = [...roleAccounts];
      const index = newData.findIndex((item) => key == item.RoleId);
      if (index > -1) {
        const item = newData[index];
        const newCollection = { ...item, ...row };
        const result = await changeRoleAccount(newCollection);
        const updateItem = result.data;
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        newData.splice(index, 1, {
          ...item,
          ...updateItem,
        });
        setRoleAccounts(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setRoleAccounts(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: RoleAccount, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.RoleId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllRoleAccount();
      if (result && result?.data) {
        setRoleAccounts(result?.data?.reverse());
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
    setRoleAccounts,
    setPopup,
    roleAccounts
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return roleAccounts ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={roleAccounts}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
}
