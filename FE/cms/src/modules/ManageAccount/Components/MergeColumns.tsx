import { Account } from "Models";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: accounts } = useAppContext("accounts");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: Account) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        accounts: accounts,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
}


export default MergedColumns;