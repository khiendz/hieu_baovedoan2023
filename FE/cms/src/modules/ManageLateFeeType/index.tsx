import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changeLateFeeType } from "./services";
import { useAppContext } from "hook/use-app-context";
import { LateFeeType } from "Models";
import { getAllLateFeeType } from "services/late-fee-type";

const ManageLateFeeType = () => {
  const { data: lateFeeTypes, setData: setLateFeeTypes } =
    useAppContext("late-fee-types");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setLateFeeTypes([]);
    initData();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: LateFeeType) =>
    record?.LateFeeTypeId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as LateFeeType;
      const newData = [...lateFeeTypes];
      const index = newData.findIndex((item) => key === item.LateFeeTypeId);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changeLateFeeType(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setLateFeeTypes(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setLateFeeTypes(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: LateFeeType, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.LateFeeTypeId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllLateFeeType();
      if (result && result?.data) {
        setLateFeeTypes(result?.data?.reverse());
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
    setLateFeeTypes,
    setPopup,
    lateFeeTypes
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return lateFeeTypes ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={lateFeeTypes}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageLateFeeType;
