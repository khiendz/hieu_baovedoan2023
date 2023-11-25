import { FilterConfirmProps } from "antd/es/table/interface";

export const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any,
    setSearchText: any,
    setSearchedColumn: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
export const handleReset = (clearFilters: () => void, setSearchText: any) => {
  clearFilters();
  setSearchText("");
};

