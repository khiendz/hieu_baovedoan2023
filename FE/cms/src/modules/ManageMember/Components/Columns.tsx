import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { LateFeeType, Member } from "Models";
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
  setLateFeeTypes: any,
  setPopup: any,
  lateFeeTypes: LateFeeType[]
) => [
  {
    title: "Tên độc giả",
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
    title: "Địa chỉ",
    className: "column-money",
    dataIndex: "Address",
    width: "450px",
    ...GetColumnSearchProps(
      "Address",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (address: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{address}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Số điện thoại",
    className: "column-money",
    dataIndex: "Phone",
    width: "450px",
    ...GetColumnSearchProps(
      "Phone",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (phone: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{phone}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Email",
    className: "column-money",
    dataIndex: "Email",
    width: "450px",
    ...GetColumnSearchProps(
      "Email",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (email: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{email}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Email",
    className: "column-money",
    dataIndex: "Email",
    width: "450px",
    ...GetColumnSearchProps(
      "Email",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (email: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{email}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Ngày tham gia",
    className: "column-money",
    dataIndex: "JoinDate",
    width: "450px",
    ...GetColumnSearchProps(
      "JoinDate",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (date: Date) => {
      return (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {format(date ? new Date(date) : new Date(), "dd-MM-yyyy")}
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
    render: (_: any, record: Member) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.MemberId?.toString() || "");
            }}
            Save={() => save(record?.MemberId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa thành viên này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.MemberId,
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
