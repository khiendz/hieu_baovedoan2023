import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { LateFee } from "Models";

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
    render: (transactionId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">
        {transactionId}
      </p>
    ),
    editable: true,
  },
  {
    title: "Tổng phí trễ hạn",
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
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{feeAmount}</p>
    ),
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
