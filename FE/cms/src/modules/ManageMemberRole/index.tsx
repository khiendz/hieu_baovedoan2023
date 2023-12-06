import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import {
  handleDelete,
  handleAdd,
  changeMemberRole,
} from "./services";
import { useAppContext } from "hook/use-app-context";
import { MemberRole } from "Models/MemberRole";
import { getAllMemberRole } from "services/member-role-service";

const ManageMemberRole = () => {
  const { data: memberRoles, setData: setMemberRoles } = useAppContext("member-roles");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setMemberRoles([]);
    initData();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: MemberRole) =>
    record?.MemberRoleId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as MemberRole;
      const newData = [...memberRoles];
      const index = newData.findIndex((item) => key === item.MemberId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeMemberRole(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setMemberRoles(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setMemberRoles(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: MemberRole, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.MemberRoleId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllMemberRole();
      if (result && result?.data) {
        setMemberRoles(result?.data?.reverse());
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
    setMemberRoles,
    setPopup,
    memberRoles
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return memberRoles ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={memberRoles}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageMemberRole;
