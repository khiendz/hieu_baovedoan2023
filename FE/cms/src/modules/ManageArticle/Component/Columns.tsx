import { FormInstance, Popconfirm } from "antd";
import GetColumnSearchProps from "components/GetColumnSearchProps";
import EditRecord from "./EditRecord";
import { JoinFileCDN } from "services/file-service";
import { Article } from "Models/Article.model";

const Columns = (
    setSearchText:any,
    setSearchedColumn: any,
    searchInput: any,
    searchedColumn: any,
    searchText: any,
    articles: Article[],
    isEditing: any,
    edit: any,
    save: any,
    cancel: any,
    form: FormInstance,
    handleDelete: any,
    setArticles: any,
    setPopup: any
) => 
[
    {
      title: "Tiêu đề",
      dataIndex: "Title",
      width: "250px",
      ...GetColumnSearchProps("TourName",setSearchText,setSearchedColumn,searchInput,searchedColumn,searchText),
      render: (title: string) => (
        <a className="dk-font-Inter dk-text-sm dk-font-semibold">{title}</a>
      ),
      editable: true,
    },
    {
      title: "Mô tả",
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
        <div
          className="dk-max-w-full dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
          dangerouslySetInnerHTML={{ __html: description }}
        >
        </div>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Nội dung",
      className: "column-money",
      dataIndex: "Content",
      width: "450px",
      ...GetColumnSearchProps(
        "Content",
        setSearchText,
        setSearchedColumn,
        searchInput,
        searchedColumn,
        searchText
      ),
      render: (description: string) => (
        <div
          className="dk-max-w-full dk-text-sm dk-font-medium dk-font-Inter dk-line-clamp-5"
          dangerouslySetInnerHTML={{ __html: description }}
        >
        </div>
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Ảnh đại diện",
      className: "column-money",
      dataIndex: "Thumb",
      width: "250px",
      render: (Thumb: any) => (
        <img src={JoinFileCDN(Thumb)} className="dk-w-[250px] dk-aspect-[3/2]" />
      ),
      editable: true,
      align: "left",
    },
    {
      title: "Cập nhật",
      dataIndex: "operation",
      align: "center",
      width: "250px",
      fixed: 'right',
      render: (_: any, record: Article) => {
        const editable = isEditing(record);
        return (
          <div className="dk-flex dk-gap-3 dk-text-[#1677ff]">
              <EditRecord
                onInit={() => {
                    edit(record, record.ArticleId?.toString() || "");
                }}
                Save={() => save(record?.ArticleId || "")}
                Cancel={cancel}
                Form={form}
                Articles={articles}
                setArticles={setArticles}
                setPopup={setPopup}
                record={record}
            />
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa dữ liệu này?"
              onConfirm={async () => {
                const result = await handleDelete(record.ArticleId,articles,setArticles);
                setPopup({
                  title: result?.status == 200 ? "Thành công" : "Thất bại",
                  messagePopup: result?.message,
                  state: result?.status == 200
                })
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