import { Payment } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import format from "date-fns/format";

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
  setPayments: any,
  setPopup: any,
  payments: Payment[]
) => [
  {
    title: "Mô tả thông tin thanh toán",
    dataIndex: "LateFeeId",
    width: "400px",
    ...GetColumnSearchProps(
      "LateFeeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (lateFeeId: number, record: Payment) => (
      <div className="dk-flex dk-flex-col dk-overflow-hidden">
                                                    <div className="dk-font-Roboto dk-font-bold">
                                Mã trễ hạn:{" "}
                                <span className="dk-font-normal">
                                  {record.LateFeeId}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Tên người mượn:{" "}
                                <span className="dk-font-normal">
                                  {record?.LateFee?.BorrowedBook?.Member?.Name}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Ngày mượn:{" "}
                                <span className="dk-font-normal">
                                  {format(record?.LateFee?.BorrowedBook?.BorrowDate ? new Date(record?.LateFee?.BorrowedBook?.BorrowDate) : new Date(), 'dd-MM-yyyy')}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Hạn trả:{" "}
                                <span className="dk-font-normal">
                                  {format(record?.LateFee?.BorrowedBook?.DueDate ? new Date(record?.LateFee?.BorrowedBook?.DueDate) : new Date(), 'dd-MM-yyyy')}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Ngày trả:{" "}
                                <span className="dk-font-normal">
                                  {record?.LateFee?.BorrowedBook?.ReturnDate  ? 
                                  format(record?.LateFee?.BorrowedBook?.ReturnDate ? new Date(record?.LateFee?.BorrowedBook?.ReturnDate) : new Date(), 'dd-MM-yyyy') :
                                  "Chưa trả"}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Tên sách:{" "}
                                <span className="dk-font-normal">
                                  {record?.LateFee?.BorrowedBook.Book.Title}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Mã mượn:{" "}
                                <span className="dk-font-normal">
                                  {record?.LateFee?.BorrowedBook?.TransactionId}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Số ngày trễ hạn:{" "}
                                <span className="dk-font-normal">
                                  {record?.LateFee?.BorrowedBook?.DueDate
                                    ? new Date().getDate() -
                                      new Date(record?.LateFee?.BorrowedBook.DueDate)?.getDate()
                                    : 0}
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Tổng tiền trễ hạn theo loại trễ hạn:{" "}
                                <span className="dk-font-normal">
                                  {new Date().getDate() -
                                    new Date(record?.LateFee?.BorrowedBook.DueDate || "")?.getDate() >=
                                    (record?.LateFee?.BorrowedBook?.Book?.LateFeeType?.DateCount || 0)
                                    ? ((record?.LateFee?.BorrowedBook?.Book?.LateFeeType?.FeeAmount || 0) *
                                      ((new Date().getDate() -
                                        new Date(
                                          record?.LateFee?.BorrowedBook.DueDate || ""
                                        )?.getDate()) /
                                        (record?.LateFee?.BorrowedBook.Book.LateFeeType.DateCount || 0))).toLocaleString("vi-VN")
                                    : 0}{" "}VND
                                </span>
                              </div>
                              <div className="dk-font-Roboto dk-font-bold">
                                Mô tả loại trễ hạn:{" "}
                                <span className="dk-font-normal">
                                  {record?.LateFee?.BorrowedBook.Book.LateFeeType.Description}
                                </span>
                              </div>
                            </div>
    ),
    editable: true,
  },
  {
    title: "Phí trễ hạn",
    dataIndex: "LateFeeId",
    width: "200px",
    ...GetColumnSearchProps(
      "LateFeeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (lateFeeId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{lateFeeId}</p>
    ),
    editable: true,
  },
  {
    title: "Ngày thanh toán",
    className: "column-money",
    dataIndex: "PaymentDate",
    width: "450px",
    ...GetColumnSearchProps(
      "PaymentDate",
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
    title: "Tổng tiền",
    dataIndex: "Amount",
    width: "200px",
    ...GetColumnSearchProps(
      "Amount",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (amount: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{amount.toLocaleString("vi-VN")} VND</p>
    ),
    editable: true,
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "250px",
    fixed: "right",
    render: (_: any, record: Payment) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.PaymentID?.toString() || "");
            }}
            Save={() => save(record?.PaymentID || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa dòng thanh toán này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.PaymentID,
                payments,
                setPayments
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
