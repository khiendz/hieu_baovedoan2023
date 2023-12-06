import { Payment } from "Models";
import { Publisher } from "Models/Publisher";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: publishers } = useAppContext("publishers");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: Publisher) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        publishers: publishers,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
};

export default MergedColumns;
