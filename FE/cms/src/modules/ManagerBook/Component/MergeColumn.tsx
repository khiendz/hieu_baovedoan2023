import { FormInstance } from "antd";

const MergedColumns = (
    columns: any, 
    isEditing: any, 
    bookTypes: any, 
    authors: any, 
    publishers: any, 
    form: FormInstance) => columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    let inputType = "text";
    switch (col.dataIndex) {
      case "Book_BookType":
        inputType = "select";
        break;
      case "Author":
        inputType = "select";
        break;
      case "Publisher":
        inputType = "select";
        break;
      case "PublicYear":
        inputType = "date";
        break;
      default:
        inputType = "text";
        break;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        bookTypes: bookTypes,
        authors: authors,
        publishers: publishers,
        form: form,
      }),
    };
  });

export default MergedColumns;