import { Author, BorrowedBook, Employee } from "Models";
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
  setBookTypes: any,
  setPopup: any,
  bookTypes: Author[]
) => [
  {
    title: "Mã nhân viên",
    dataIndex: "EmployeeId",
    width: "200px",
    ...GetColumnSearchProps(
      "EmployeeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (employeeId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{employeeId}</p>
    ),
    editable: true,
  },
  {
    title: "Lịch làm việc",
    className: "column-money",
    dataIndex: "WorkSchedule",
    width: "450px",
    ...GetColumnSearchProps(
      "WorkSchedule",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (workSchedule: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">
        {workSchedule}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Kiểu nhân viên",
    className: "column-money",
    dataIndex: "EmployeeTypeId",
    width: "450px",
    ...GetColumnSearchProps(
      "EmployeeTypeId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (employeeTypeId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">
        {employeeTypeId}
      </p>
    ),
    editable: true,
    align: "left",
  },
  {
    title: "Thông tin nhân viên",
    className: "column-money",
    dataIndex: "UserId",
    width: "450px",
    ...GetColumnSearchProps(
      "UserId",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (userId: number) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{userId}</p>
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
    render: (_: any, record: Employee) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.EmployeeId?.toString() || "");
            }}
            Save={() => save(record?.EmployeeId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa nhân viên này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.EmployeeId,
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
