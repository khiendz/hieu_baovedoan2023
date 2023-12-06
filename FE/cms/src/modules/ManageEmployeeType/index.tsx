import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeEmployeeType } from "./services";
import { useAppContext } from "hook/use-app-context";
import { EmployeeType } from "Models/EmployeeType";
import { getAllEmployeeType } from "services";

const ManageEmployeeType = () => {
  const { data: employeeTypes, setData: setEmployeeTypes } =
    useAppContext("employee-types");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setEmployeeTypes([]);
    initData();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: EmployeeType) =>
    record?.EmployeeTypeId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as EmployeeType;
      const newData = [...employeeTypes];
      const index = newData.findIndex((item) => key === item.EmployeeTypeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeEmployeeType(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setEmployeeTypes(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setEmployeeTypes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: EmployeeType, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.EmployeeTypeId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllEmployeeType();
      if (result && result?.data) {
        setEmployeeTypes(result?.data?.reverse());
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
    setEmployeeTypes,
    setPopup,
    employeeTypes
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return employeeTypes ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={employeeTypes}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageEmployeeType;
