import React, { useEffect, useRef, useState } from "react";
import { Form, InputRef, Table } from "antd";
import { Book } from "Models/Book";
import "./style.scss";
import AddRecord from "./Component/AddRecord";
import Columns from "./Component/Columns";
import MergedColumns from "./Component/MergeColumn";
import { changeArticle, handleAdd, handleDelete } from "./Services";
import { useAppContext } from "hook/use-app-context";
import { Article } from "Models/Article.model";
import { getAllArticle } from "services/article-service";

const ManageArticle: React.FC = () => {
  const { setData: setPopup } = useAppContext("popup-message");
  const { data: articles, setData: setArticles } = useAppContext('articles');
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const isEditing = (record: Article) => record?.ArticleId?.toString() === editingKey;

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Article;
      const newData = [...articles];
      const index = newData.findIndex((item) => key === item.ArticleId);
      if (index > -1) {
        const item = newData[index];
        const newBook = { ...item, ...row };
        const result = await changeArticle(newBook);
        setPopup({
          title: result?.status == 200 ? "Thành công" : "Thất bại",
          messagePopup: result?.message,
          state: result?.status == 200,
        });
        newData.splice(index, 1, {
          ...item,
          ...result.data,
        });
        setArticles(newData);
        setEditingKey("");
        initData();
      } else {
        newData.push(row);
        setArticles(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

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
    setArticles([]);
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAllArticle();
      if (result && result?.data) {
        setArticles(result?.data?.reverse());
      }
    } catch (e) {}
  };

  const columns = Columns(
    setSearchText,
    setSearchedColumn,
    searchInput,
    searchedColumn,
    searchText,
    articles,
    isEditing,
    edit,
    save,
    cancel,
    form,
    handleDelete,
    setArticles,
    setPopup
  );

  const mergedColumns = MergedColumns(
    columns,
    isEditing,
    articles,
    form
  );

  return articles ? (
    <>
      <Form form={form} component={false}>
        <AddRecord
          Save={handleAdd}
          Form={form}
          Articles={articles}
          setArticles={setArticles}
          setPopup={setPopup}
        />
        <Table
          columns={mergedColumns}
          dataSource={articles}
          rowClassName="editable-row"
          bordered
          scroll={{ x: 1600, y: 700 }}
          title={() => (
            <p className="dk-font-Inter dk-font-semibold dk-text-[14xp]">
              {"Danh sách tin tức"}
            </p>
          )}
          footer={() => (
            <p className="dk-font-Inter dk-font-semibold dk-text-[14xp]">
              {"Sách là tri thức của nhân loại"}
            </p>
          )}
        ></Table>
      </Form>
    </>
  ) : null;
};

export default ManageArticle;
