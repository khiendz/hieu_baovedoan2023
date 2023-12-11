import { Payment } from "Models";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { FormInstance, Popconfirm } from "antd";
import format from "date-fns/format";
import { Publisher } from "Models/Publisher";

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
  setPublishers: any,
  setPopup: any,
  publishers: Publisher[]
) => [
  {
    title: "Tên nhà xuất bản",
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
    render: (address: string) => {
      return (
        <p className="dk-block dk-w-[150px] dk-text-sm dk-font-medium dk-font-Inter">
          {address}
        </p>
      );
    },
    editable: true,
    align: "left",
  },
  {
    title: "Số điện thoại",
    dataIndex: "PHONE",
    width: "200px",
    ...GetColumnSearchProps(
      "PHONE",
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
  },
  {
    title: "Website",
    dataIndex: "StatePayment",
    width: "200px",
    ...GetColumnSearchProps(
      "Website",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (website: string) => (
      <p className="dk-font-Inter dk-text-sm dk-font-semibold">{website}</p>
    ),
    editable: true,
  },
  {
    title: "Cập nhật",
    dataIndex: "operation",
    align: "center",
    width: "250px",
    fixed: "right",
    render: (_: any, record: Publisher) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.PublisherId?.toString() || "");
            }}
            Save={() => save(record?.PublisherId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa nhà xuất bản này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.PublisherId,
                publishers,
                setPublishers
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
