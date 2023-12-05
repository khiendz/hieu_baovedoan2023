import { Account } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";

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
  setAccounts: any,
  setPopup: any,
  accounts: Account[]
) => [
  {
    title: "UserName",
    dataIndex: "UserName",
    width: "200px",
    ...GetColumnSearchProps(
      "UserName",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (userName: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{userName}</p>
    ),
    editable: true,
  },
  {
    title: "Password",
    className: "column-money",
    dataIndex: "Password",
    width: "450px",
    ...GetColumnSearchProps(
      "Password",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (password: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{password}</p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Loại tài khoản",
    className: "column-money",
    dataIndex: "RoleId",
    width: "200px",
    ...GetColumnSearchProps(
      "RoleId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (roleId: number, record: Account) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {record?.RoleAccount?.RoleName}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Người dùng",
    className: "column-money",
    dataIndex: "UserId",
    width: "200px",
    ...GetColumnSearchProps(
      "UserId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (UserId: number, record: Account) => (
      <p className="dk-min-w-[350px] dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5">
        {record?.User?.FirstName + " " + record?.User?.LastName}
      </p>
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
    render: (_: any, record: Account) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.AccountId?.toString() || "");
            }}
            Save={() => save(record?.AccountId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa tài khoản này"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.AccountId,
                accounts,
                setAccounts
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
