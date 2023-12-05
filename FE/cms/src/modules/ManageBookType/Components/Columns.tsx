import { Author, BookType } from "Models";
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
  setBookTypes: any,
  setPopup: any,
  bookTypes: Author[]
) => [
  {
    title: "Tên loại sách",
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
    title: "Mô tả loại sách",
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
    title: "Ảnh thumb",
    className: "column-money",
    dataIndex: "Img",
    width: "450px",
    ...GetColumnSearchProps(
      "Img",
      setSearchText,
      setSearchedColumn,
      searchInput,
      searchedColumn,
      searchText
    ),
    render: (img: any) => (
      <img src={JoinFileCDN(img)} className="dk-w-[250px] dk-aspect-[4/6]" />
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
    render: (_: any, record: BookType) => {
      const editable = isEditing(record);

      return (
        <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
          <EditRecord
            onInit={() => {
              edit(record, record.BookTypeId?.toString() || "");
            }}
            Save={() => save(record?.BookTypeId || "")}
            Cancel={cancel}
            Form={form}
          />
          <Popconfirm
            title={"Bạn có chắc chắn muốn xóa loại sách này ?"}
            onConfirm={async () => {
              const result = await handleDelete(
                record.BookTypeId,
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
