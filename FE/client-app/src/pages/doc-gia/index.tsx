import LayoutDefault from "components/layouts/LayoutDefault";
import {
  QuestionCircleOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import React from "react";
import SelectBox from "components/SelectBox";
import ReaderDataGrid from "components/ReaderDataGrid";

export default function Reader() {
  return (
    <LayoutDefault>
      <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4">
        <h1 className="dk-text-[#222] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          Thư viện Hiếu cung cấp cho các bạn đầy đủ thông tin về tài liệu online
          cũng như tài liệu vật lý
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#222]">
          Trang tài liệu chính thống và đầy đủ số 1
        </h2>
        <ReaderDataGrid/>
      </div>
    </LayoutDefault>
  );
}
