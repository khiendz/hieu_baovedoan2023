import { Account, Author, BookType } from "Models";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: bookTypes } = useAppContext("book-types");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: BookType) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        bookTypes: bookTypes,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
};

export default MergedColumns;
