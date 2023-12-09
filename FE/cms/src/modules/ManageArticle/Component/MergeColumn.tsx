import { FormInstance } from "antd";

const MergedColumns = (
    columns: any, 
    isEditing: any, 
    articles: any, 
    form: FormInstance) => columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";
   
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        articles: articles,
        form: form,
      }),
    };
  });

export default MergedColumns;