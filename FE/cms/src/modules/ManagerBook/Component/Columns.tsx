import { Author } from "Models/Author";
import { Book } from "Models/Book";
import { BookType } from "Models/BookType";
import { Book_BookType } from "Models/Book_BookType";
import { Publisher } from "Models/Publisher";
import { FormInstance, Popconfirm, Typography } from "antd";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import format from 'date-fns/format';

const Columns = (
    setSearchText:any,
    setSearchedColumn: any
    ,searchInput: any,
    searchedColumn: any,
    searchText: any,
    books: Book[],
    bookTypes: BookType[],
    isEditing: any,
    edit: any,
    save: any,
    cancel: any,
    form: FormInstance,
    handleDelete: any,
    setBook: any,
    setPopup: any
) => 
[
    {
      title: "Tiêu đề",
      dataIndex: "Title",
      ...GetColumnSearchProps("TourName",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (title: string) => (
        <a className="dk-font-Inter dk-text-sm dk-font-semibold">{title}</a>
      ),
      editable: true,
    },
    {
      title: "Loại sách",
      className: "column-money",
      dataIndex: "Book_BookType",
      inputType: "Select",
      ...GetColumnSearchProps("Book_BookType",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (bookType: Book_BookType[]) => (
        <span className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {bookTypes
            .filter((ob: BookType) =>
              bookType?.find(
                (el: Book_BookType) => el.BookTypeId == ob.BookTypeId
              )
            )
            .map((ob: BookType) => ob?.Name)
            ?.join(", ")}
        </span>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "ISBN",
      className: "column-money",
      dataIndex: "ISBN",
      ...GetColumnSearchProps("ISBN",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Số lượng",
      className: "column-money",
      dataIndex: "Quantity",
      ...GetColumnSearchProps("Quantity",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Vị trí",
      className: "column-money",
      dataIndex: "Location",
      ...GetColumnSearchProps("Location",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Năm xuất bản",
      className: "column-money",
      dataIndex: "PublicYear",
      ...GetColumnSearchProps("PublicYear",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (date: any) => {
        const timer = new Date(date || new Date());
        return <p>{format(timer, "dd-MM-yyyy")}</p>;
      },
      editable: true,
      align: "left",
    },
    {
      title: "Ảnh đại diện",
      className: "column-money",
      dataIndex: "Img",
      ...GetColumnSearchProps("Img",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (img: any) => (
        <img src={img} className="dk-w-[150px] dk-aspect-[3/4]" />
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Mã sách",
      className: "column-money",
      dataIndex: "Barcode",
      ...GetColumnSearchProps("Barcode",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Nhà xuất bản",
      className: "column-money",
      dataIndex: "Publisher",
      inputType: "Select",
      ...GetColumnSearchProps("Publisher",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (publisher: Publisher) => (
        <span className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {publisher?.Name}
        </span>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Tác giả",
      className: "column-money",
      dataIndex: "Author",
      inputType: "Select",
      ...GetColumnSearchProps("Author",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (author: Author) => (
        <span className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {author?.Name}
        </span>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "operation",
      dataIndex: "operation",
      align: "center",
      width: "250px",
      fixed: 'right',
      render: (_: any, record: Book) => {
        const editable = isEditing(record);
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={async () => {
                const result = await handleDelete(record.BookId);
                setPopup({
                  title: result?.status == 200 ? "Thành công" : "Thất bại",
                  messagePopup: result?.message,
                  state: result?.status == 200
                })
              }}
            >
              <a>Delete</a>
            </Popconfirm>
            {editable ? (
              <span className="dk-block dk-w-[88px] dk-font-semibold">
                <Typography.Link
                  onClick={() => save(record?.BookId || "")}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                onClick={() => edit(record, record.BookId?.toString() || "")}
              >
                Edit
              </Typography.Link>
            )}
          </div>
        );
      },
    },
  ];

export default Columns;