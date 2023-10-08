import LayoutDefault from "components/layouts/LayoutDefault";
import {
  QuestionCircleOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import React from "react";
import SelectBox from "components/SelectBox";

export default function Home() {
  return (
    <LayoutDefault>
            <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4">
        <h1 className="dk-text-[#222] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          Thư viện Hiếu cung cấp cho các bạn đầy đủ thông tin về tài liệu online cũng như tài liệu vật lý
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#222]">
          Trang tài liệu chính thống và đầy đủ số 1
        </h2>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
          <div className="field">
            <QuestionCircleOutlined className="dk-absolute dk-left-6 dk-top-8 dk-z-[3] dk-text-[#222]" />
            <input
              className="field dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed"
              placeholder="Bạn muốn tìm sách nào ?"
            />
          </div>
          <div className="select dk-flex dk-flex-row dk-gap-4 dk-relative dk-z-10">
            <SelectBox/>
          </div>
          <div className="dk-w-full dk-flex dk-items-center dk-justify-center dk-relative dk-z-10">
            <button className="dk-p-3 dk-flex dk-gap-4 dk-bg-[#F79321] dk-text-sm dk-font-bold dk-font-Roboto dk-rounded dk-text-[#222]">
              <SecurityScanOutlined />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
          <div className="dk-flex dk-gap-4">
            <h2 className="dk-text-[#222] dk-font-bold dk-text-2xl dk-relative dk-z-[14]">
              Combo thuê sách tốt nhất hôm nay
            </h2>
            <div className="dk-flex dk-items-center dk-p-2 dk-bg-red-200 dk-text-red-500 dk-rounded-xl dk-relative dk-z-[14] dk-h-9 dk-text-sm">
                <img width="20" src="https://res.ivivu.com/hotel/img/fire-sale.svg"/>
                498 đã thuê combo sách này
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
