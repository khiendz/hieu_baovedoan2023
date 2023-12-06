import { MemberRole } from "Models/MemberRole";
import { FormInstance } from "antd";
import { useAppContext } from "hook/use-app-context";

const MergedColumns = (columns: any, isEditing: any, form: FormInstance) => {
  const { data: memberRoles } = useAppContext("member-roles");
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";

    return {
      ...col,
      onCell: (record: MemberRole) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        memberRoles: memberRoles,
        editing: record ? isEditing(record).toString() : "true",
        form: form,
      }),
    };
  });
};

export default MergedColumns;
