import { Account, CollectionImage, RoleAccount, TourType } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import { JoinFileCDN } from "services/file-service";

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
  setRoleAccounts: any,
  setPopup: any,
  roleAccounts: Account[]
) => [
  {
    title: "Tên role",
    dataIndex: "RoleName",
    ...GetColumnSearchProps(
      "RoleName",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (roleName: string) => (
      <a className="dk-font-Inter dk-text-sm dk-font-semibold">{roleName}</a>
    ),
    editable: true,
  },
  {
    title: "Mô tả role",
    className: "column-money",
    dataIndex: "Description",
    width: "27%",
    ...GetColumnSearchProps(
      "Description",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (description: string) => (
      <div className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {description}
      </div>
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
    render: (_: any, record: RoleAccount) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.RoleId?.toString() || "");
            }}
            Save={() => save(record?.RoleId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc muốn xóa ảnh này không"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.RoleId,
                roleAccounts,
                setRoleAccounts
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
