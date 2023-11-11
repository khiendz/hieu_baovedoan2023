import { Author } from "Models/Author";
import { Book } from "Models/Book";
import { BookType } from "Models/BookType";
import { Publisher } from "Models/Publisher";
import dayjs from "dayjs";
import { Form, Input, Select, DatePicker, Space, FormInstance } from "antd";
import { Book_BookType } from "Models/Book_BookType";

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
  switch (inputType) {
    case "select":
      inputNode =
        dataIndex != "Book_BookType" ? (
          <Space wrap>
            <Select
              className="dk-w-[200px]"
              defaultValue={arrayValue[0]?.value}
              options={[...arrayValue]}
              onChange={(value) => {
                form.setFieldValue(dataIndex, arrayValue[value - 1].ob);
              }}
            />
          </Space>
        ) : (
          <Space wrap>
            <Select
              mode="multiple"
              className="dk-w-[200px]"
              defaultValue={arrayBookType.filter((ob) =>
                record.Book_BookType.find((ele) => ele.BookTypeId == ob.value)
              )}
              options={[...arrayValue]}
              onChange={(value: any) => {
                const dataFilter: BookType[] = bookTypes.filter(
                  (ob: BookType) =>
                    value?.find((el: any) => el === ob.BookTypeId)
                );
                const data = dataFilter.map(
                  (el: BookType) =>
                    new Book_BookType(record.BookId, el.BookTypeId, record, el)
                );
                form.setFieldValue(dataIndex, data);
              }}
            />
          </Space>
        );
      break;
    case "date":
      inputNode = (
        <Space direction="vertical" size={12}>
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(record?.PublicYear)}
            className="dk-w-[200px]"
          />
        </Space>
      );
      break;
    default:
      inputNode = <Input />;
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
