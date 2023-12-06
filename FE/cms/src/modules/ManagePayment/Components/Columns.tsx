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
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{amount}</p>
    ),
    editable: true,
  },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "StatePayment",
    width: "200px",
    ...GetColumnSearchProps(
      "Amount",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (statePayment: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{statePayment}</p>
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
