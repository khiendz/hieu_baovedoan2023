import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { BorrowedBook, LateFee } from "Models";
import IconMoney from "../Images/icon-money.svg";

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
  setLateFees: any,
  setPopup: any,
  lateFees: LateFee[]
) => [
  {
    title: "Thông tin giao dịch",
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
    render: (transactionId: number, record: LateFee) => (
      <div className="dk-font-Inter dk-text-sm dk-font-semibold">
        <p>Tên độc giả: {record.BorrowedBook.Member.Name}</p>
        <p>Sách mượn: {record.BorrowedBook.Book.Title}</p>
        <p>Mã mượn: {record.BorrowedBook.TransactionId}</p>
      </div>
    ),
    editable: true,
  },
  {
    title: "Tổng phí trễ hạn tạm tính",
    className: "column-money",
    dataIndex: "FeeAmount",
    width: "450px",
    ...GetColumnSearchProps(
      "FeeAmount",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (feeAmount: number) => (
      <p className="dk-font-Inter dk-text-sm dk-bg-green-800 dk-font-bold dk-rounded dk-text-[#FFF] dk-p-1 dk-w-fit">{feeAmount.toLocaleString("vi-VN")} VND <IconMoney/></p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Loại trễ hạn",
    className: "column-money",
    dataIndex: "TransactionId",
    width: "450px",
    ...GetColumnSearchProps(
      "TransactionId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (transactionId: number, record: LateFee) => (
      <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col">
        <span className="dk-font-Roboto dk-font-bold">
          Tên loại trễ hạn:{" "}
          <span className="dk-font-normal">{record.BorrowedBook?.Book?.LateFeeType?.Name}</span>
        </span>
        <span className="dk-font-Roboto dk-font-bold">
          Mô tả loại trễ hạn: <span className="dk-font-normal">{record?.BorrowedBook?.Book.LateFeeType?.Description}</span>
        </span>
      </div>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Tình trạng thanh toán",
    className: "column-money",
    dataIndex: "TransactionId",
    width: "450px",
    ...GetColumnSearchProps(
      "TransactionId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (transactionId: number, record: LateFee) => { 
      const isPayment = record?.Payment?.length > 0;
      return (
      <div className={`dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col ${!isPayment ? "dk-p-1 dk-bg-red-700 dk-font-Roboto dk-font-bold dk-rounded-md dk-w-fit dk-text-[#FFF]" : ""}`}>
        {
          record?.Payment?.length > 0 ? "Đã thanh toán" : "Chưa thanh toán"
        }
      </div>
    )},
    editable: true,
    align: "left",
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "250px",
    fixed: "right",
    render: (_: any, record: LateFee) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.LateFeeId?.toString() || "");
            }}
            Save={() => save(record?.LateFeeId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa loại nhân viên này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.LateFeeId,
                lateFees,
                setLateFees
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
