import { Author } from "Models/Author";
import { Book } from "Models/Book";
import { BookType } from "Models/BookType";
import { Publisher } from "Models/Publisher";
import dayjs from "dayjs";
import { Form, Input, Select, DatePicker, Space, FormInstance } from "antd";
import { Book_BookType } from "Models/Book_BookType";

const { TextArea } = Input;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "date" | "text" | "select";
  bookTypes: BookType[];
  authors: Author[];
  publishers: Publisher[];
  form: FormInstance<any>;
  record: Book;
  index: number;
  children: React.ReactNode;
}

interface valueFiledSelect {
  value: string;
  label: string;
  ob: any;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  bookTypes,
  authors,
  publishers,
  form,
  record,
  index,
  children,
  ...restProps
}) => {
  const arrayBookType = bookTypes?.map((ob: BookType) => {
    return { value: ob.BookTypeId, label: ob.Name, ob: ob };
  });
  const arrayAuthorType = authors?.map((ob: Author) => {
    return { value: ob.AuthorId, label: ob.Name, ob: ob };
  });
  const arrayPublisherType = publishers?.map((ob: Publisher) => {
    return { value: ob.PublisherId, label: ob.Name, ob: ob };
  });
  let inputNode = null;
  let arrayValue: any = [];
  switch (dataIndex) {
    case "Book_BookType":
      arrayValue = arrayBookType;
      break;
    case "Author":
      arrayValue = arrayAuthorType;
      break;
    case "Publisher":
      arrayValue = arrayPublisherType;
      break;
    default:
      break;
  }
  switch (dataIndex) {
    case "Name": 
      inputNode = <Input/>
      break;
    default:
      inputNode = <TextArea className="dk-h-fit dk-p-3"/>;
      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
