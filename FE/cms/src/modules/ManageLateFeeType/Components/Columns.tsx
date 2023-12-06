import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { LateFee, LateFeeType } from "Models";

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
  setLateFeeTypes: any,
  setPopup: any,
  lateFeeTypes: LateFeeType[]
) => [
  {
    title: "Thông tin giao dịch",
    dataIndex: "Name",
    width: "200px",
    ...GetColumnSearchProps(
      "Name",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (name: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{name}</p>
    ),
    editable: true,
  },
  {
    title: "Mô tả loại phí trễ hạn",
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
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{description}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Phí trễ hạn",
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
    title: "Số ngày tính phí trễ 1 lần",
    className: "column-money",
    dataIndex: "DateCount",
    width: "450px",
    ...GetColumnSearchProps(
      "DateCount",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (count: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{count}</p>
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
    render: (_: any, record: LateFeeType) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.LateFeeTypeId?.toString() || "");
            }}
            Save={() => save(record?.LateFeeTypeId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa loại phí trễ hạn này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.LateFeeTypeId,
                lateFeeTypes,
                setLateFeeTypes
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
