import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { LateFeeType, Member } from "Models";
import format from "date-fns/format";
import { MemberRole } from "Models/MemberRole";

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
    title: "Giá trị role",
    dataIndex: "Value",
    width: "200px",
    ...GetColumnSearchProps(
      "Value",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (value: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{value}</p>
    ),
    editable: true,
  },
  {
    title: "Mô tả role",
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
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "250px",
    fixed: "right",
    render: (_: any, record: MemberRole) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.MemberRoleId?.toString() || "");
            }}
            Save={() => save(record?.MemberRoleId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa role độc giả này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.MemberRoleId,
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
