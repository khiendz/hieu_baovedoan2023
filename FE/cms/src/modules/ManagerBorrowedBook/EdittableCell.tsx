import { Author } from "Models/Author";
import { Book } from "Models/Book";
import { BookType } from "Models/BookType";
import { Publisher } from "Models/Publisher";
import dayjs from "dayjs";
import { Form, Input, Select, DatePicker, Space, FormInstance } from "antd";
import { Book_BookType } from "Models/Book_BookType";
import { BorrowedBook } from "Models/BorrowedBook";
import { Member } from "Models/Member";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  members: Member[];
  books: Book[];
  inputType: "date" | "text" | "select";
  form: FormInstance<any>;
  record: BorrowedBook;
  index: number;
  children: React.ReactNode;
}
export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  members,
  books,
  inputType,
  form,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode = null;
  switch (dataIndex) {
    case "MemberId":
      inputNode = (
        <Space wrap>
            <Select
              className="dk-w-[200px]"
              defaultValue={
                members.find((ob: Member) => ob.MemberId === record.MemberId)?.Name
              }
              options={[...members?.map((ob: Member) => {
                return { value: ob.MemberId, label: ob.Name, ob: ob };
              })]}
              onChange={(value) => {
                form.setFieldValue(dataIndex, value);
              }}
            />
          </Space>
      );
      break;
    case "BookId":
      inputNode = (
        <Space wrap>
            <Select
              className="dk-w-[200px]"
              defaultValue={
                books.find((ob: Book) => ob.BookId === record.BookId)?.Title
              }
              options={[...books?.map((ob: Book) => {
                return { value: ob.BookId, label: ob.Title, ob: ob };
              })]}
              onChange={(value) => {
                form.setFieldValue(dataIndex, value);
              }}
            />
          </Space>
      );
      break;
    case "BorrowDate":
      inputNode = (
        <Space direction="vertical" size={12}>
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(record?.BorrowDate)}
            className="dk-w-[200px]"
            onChange={(value) => {
              form.setFieldValue(dataIndex, dayjs(value));
            }}
          />
        </Space>
      );
      break;
    case "DueDate":
      inputNode = (
        <Space direction="vertical" size={12}>
          <DatePicker
            format={"DD-MM-YYYY"}
            defaultValue={dayjs(record?.DueDate)}
            className="dk-w-[200px]"
            onChange={(value) => {
              form.setFieldValue(dataIndex, dayjs(value));
            }}
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
