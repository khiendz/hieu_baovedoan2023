import { Author } from "Models/Author";
import { Book } from "Models/Book";
import { BookType } from "Models/BookType";
import { Book_BookType } from "Models/Book_BookType";
import { Publisher } from "Models/Publisher";
import { FormInstance, Popconfirm, Typography } from "antd";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import format from 'date-fns/format';
import EditRecord from "./EditRecord";
import { JoinFileCDN } from "services/file-service";

const Columns = (
    setSearchText:any,
    setSearchedColumn: any,
    searchInput: any,
    searchedColumn: any,
    searchText: any,
    books: Book[],
    authors: Author[],
    bookTypes: BookType[],
    publishers: Publisher[],
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
      width: "250px",
      ...GetColumnSearchProps("TourName",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (title: string) => (
        <a className="dk-font-Inter dk-text-sm dk-font-semibold">{title}</a>
      ),
      editable: true,
    },
    {
      title: "Mô tả",
      className: "column-money",
      dataIndex: "Description",
      width: "450px",
      ...GetColumnSearchProps(
        "Description",
        setSearchText,
        setSearchedColumn,
        searchInput,
        searchedColumn,
        searchText
      ),
      render: (description: string) => (
        <div
          className="dk-max-w-full dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
          dangerouslySetInnerHTML={{ __html: description }}
        >
        </div>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Loại sách",
      className: "column-money",
      dataIndex: "Book_BookType",
      inputType: "Select",
      width: "250px",
      ...GetColumnSearchProps("Book_BookType",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (bookType: Book_BookType[]) => {
        return (
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
      )},
      editable: true,
      align: "left",
    },
    {
      title: "ISBN",
      className: "column-money",
      dataIndex: "ISBN",
      width: "80px",
      ...GetColumnSearchProps("ISBN",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Số lượng",
      className: "column-money",
      dataIndex: "Quantity",
      width: "80px",
      ...GetColumnSearchProps("Quantity",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Vị trí",
      className: "column-money",
      dataIndex: "Location",
      width: "250px",
      ...GetColumnSearchProps("Location",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Năm xuất bản",
      className: "column-money",
      dataIndex: "PublicYear",
      width: "150px",
      ...GetColumnSearchProps("PublicYear",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (date: Date) => {
        return (<p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
        {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
      </p>)
      },
      editable: true,
      align: "left",
    },
    {
      title: "Ảnh đại diện",
      className: "column-money",
      dataIndex: "Img",
      width: "250px",
      render: (img: any) => (
        <img src={JoinFileCDN(img)} className="dk-w-[250px] dk-aspect-[4/6]" />
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Mã sách",
      className: "column-money",
      dataIndex: "Barcode",
      width: "80px",
      ...GetColumnSearchProps("Barcode",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      editable: true,
      align: "left",
    },
    {
      title: "Nhà xuất bản",
      className: "column-money",
      dataIndex: "Publisher",
      inputType: "Select",
      width: "250px",
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
      width: "250px",
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
      title: "Cập nhật",
      dataIndex: "operation",
      align: "center",
      width: "250px",
      fixed: 'right',
      render: (_: any, record: Book) => {
        const editable = isEditing(record);
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
              <EditRecord
                onInit={() => {
                    edit(record, record.BookId?.toString() || "");
                }}
                Save={() => save(record?.BookId || "")}
                Cancel={cancel}
                Form={form}
                Books={books}
                BookTypes={bookTypes}
                Publishers={publishers}
                Authors={authors}
                setBook={setBook}
                setPopup={setPopup}
                record={record}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={async () => {
                const result = await handleDelete(record.BookId,books,setBook);
                setPopup({
                  title: result?.status == 200 ? "Thành công" : "Thất bại",
                  messagePopup: result?.message,
                  state: result?.status == 200
                })
              }}
            >
              <a>Delete</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

export default Columns;