import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import AddRecord from "./Components/AddRecord";
import "./style.scss";
import Columns from "./Components/Columns";
import MergedColumns from "./Components/MergeColumns";
import { handleDelete, handleAdd, changePublisher} from "./services";
import { useAppContext } from "hook/use-app-context";
import { Publisher } from "Models/Publisher";
import { getAllPublisher } from "services";

const ManagePublisher= () => {
  const { data: publishers, setData: setPublishers } =
    useAppContext("publisher");
  const { setData: setPopup } = useAppContext("popup-message");
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setPublishers([]);
    initData();
    setPopup({
      title: "",
      messagePopup: "",
      state: true,
    });
  }, []);

  const isEditing = (record: Publisher) =>
    record?.PublisherId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Publisher;
      const newData = [...publishers];
      const index = newData.findIndex((item) => key === item.PaymentID);
      if (index > -1) {
        const item = newData[index];
        const newTourType = { ...item, ...row };
        const result = await changePublisher(newTourType);
        if (result && result.status == 200) {
          const updateItem = result.data;
          newData.splice(index, 1, {
            ...item,
            ...updateItem,
          });
          setPublishers(newData);
        }
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setPublishers(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record: Publisher, key: string) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.PublisherId?.toString() || "");
  };

  const initData = async () => {
    try {
      const result = await getAllPublisher();
      if (result && result?.data) {
        setPublishers(result?.data?.reverse());
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
    setPublishers,
    setPopup,
    publishers
  );

  const mergedColumns = MergedColumns(columns, isEditing, form);

  return publishers ? (
    <>
      <Form form={form} component={false}>
        <AddRecord Save={handleAdd} Form={form} setPopup={setPopup} />
        <Table
          columns={mergedColumns}
          dataSource={publishers}
          rowClassName="editable-row"
          scroll={{ x: 1600, y: 700 }}
          bordered
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManagePublisher;
