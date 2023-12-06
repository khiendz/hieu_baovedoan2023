import { Author, BorrowedBook, Member } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import format from 'date-fns/format';

const Columns = (
  setSearchText: any,
  setSearchedColumn: any,
  searchInput: any,
  searchedColumn: any,
  searchText: any,
  isEditing: any,
  edit: any,
  save: any,
  cancel: any,
  form: FormInstance,
  handleDelete: any,
  setBookTypes: any,
  setPopup: any,
  bookTypes: Author[],
  members: Member[]
) => [
  {
    title: "Mã mượn",
    dataIndex: "TransactionId",
    width: "200px",
    ...GetColumnSearchProps(
      "TransactionId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (transactionId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{transactionId}</p>
    ),
    editable: true,
  },
  {
    title: "Thành viên",
    className: "column-money",
    dataIndex: "MemberId",
    width: "450px",
    ...GetColumnSearchProps(
      "MemberId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (memberId: number) => (
      <div className="dk-font-Inter dk-text-sm dk-font-semibold">{
        members.find((member: Member) => member.MemberId == memberId)?.Name
      }</div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Sách mượn",
    className: "column-money",
    dataIndex: "BookId",
    width: "450px",
    ...GetColumnSearchProps(
      "BookId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (bookId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{bookId}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày mượn",
    className: "column-money",
    dataIndex: "BorrowDate",
    width: "450px",
    ...GetColumnSearchProps(
      "BorrowDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => {
      return (<p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
      {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
    </p>)
    },
    editable: true,
    align: "left",
  },
  {
    title: "Hạn trả",
    className: "column-money",
    dataIndex: "DueDate",
    width: "450px",
    ...GetColumnSearchProps(
      "DueDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => {
      return (<p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
      {format(date ? new Date(date) : new Date(), 'dd-MM-yyyy')}
    </p>)
    },
    editable: true,
    align: "left",
  },
  {
    title: "Ngày trả",
    className: "column-money",
    dataIndex: "ReturnDate",
    width: "450px",
    ...GetColumnSearchProps(
      "ReturnDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => {
      let formattedDate = "Chưa trả";
      if (date && date?.toString() != "1970-01-01T00:00:00.000Z") {
        formattedDate = format(new Date(date), 'dd-MM-yyyy');
      }
      return (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {formattedDate}
        </p>
      );
    },
    editable: true,
    align: "left",
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "250px",
    fixed: "right",
    render: (_: any, record: BorrowedBook) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.TransactionId?.toString() || "");
            }}
            Save={() => save(record?.TransactionId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa sách mượn này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.TransactionId,
                bookTypes,
                setBookTypes
              );
              setPopup({
                title: result?.status == 200 ? "Thành công" : "Thất bại",
                messagePopup: result?.message,
                state: result?.status == 200,
              });
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
