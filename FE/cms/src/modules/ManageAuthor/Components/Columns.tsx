import { Account, Author } from "Models";
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
  setAuthors: any,
  setPopup: any,
  authors: Author[]
) => [
  {
    title: "Tên tác giả",
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
    title: "Mô tả tác giả",
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
    render: (_: any, record: Author) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.AuthorId?.toString() || "");
            }}
            Save={() => save(record?.AuthorId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa tác giả này"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.AuthorId,
                authors,
                setAuthors
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
