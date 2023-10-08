"use client";
import LayoutDefault from "../../components/layouts/LayoutDefault"
import React from "react";
import {
  QuestionCircleOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";

export default function tour() {
  return (
    <LayoutDefault>
      <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4">
        <h1 className="dk-text-[#FFF] dk-font-bold dk-text-2xl dk-relative dk-z-[2]">
          TRẢI NGHIỆM KỲ NGHỈ TUYỆT VỜI
        </h1>
        <h2 className="dk-font-medium dk-text-xs dk-text-[#FFF]">
          Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất
        </h2>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
          <div className="field">
            <QuestionCircleOutlined className="dk-absolute dk-left-6 dk-top-8 dk-z-[3] dk-text-[#222]" />
            <input
              className="field dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed"
              placeholder="Bạn muốn đi đâu ?"
            />
          </div>
          <div className="select dk-flex dk-flex-row dk-gap-4 dk-relative dk-z-10">
            <div className="select-date dk-flex dk-gap-4">
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2 dk-relative dk-z-10">
                <label
                  htmlFor={"dateFromTo"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start dk-relative dk-z-10"
                >
                  Ngày khởi hành
                </label>
                <input
                  type="date"
                  name="dateFromTo"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[200px]"
                />
              </div>
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2">
                <label
                  htmlFor={"dateFromTo"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start dk-relative dk-z-10"
                >
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="dateFromTo"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[200px]"
                />
              </div>
            </div>
            <div className="description select-date dk-flex dk-gap-4 dk-relative dk-z-10">
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2">
                <label
                  htmlFor={"oldPeople"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start"
                >
                  Số người lớn
                </label>
                <input
                  type="number"
                  name="oldPeople"
                  placeholder="Nhập số lượng"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-4 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[150px]"
                />
              </div>
              <div className="dk-flex dk-flex-col dk-whitespace-nowrap dk-flex-nowrap dk-items-center dk-gap-2 dk-relative dk-z-10">
                <label
                  htmlFor={"youngPeople"}
                  className="dk-text-[#fff] dk-font-medium dk-text-sm dk-text-center dk-w-full dk-flex dk-justify-start"
                >
                  Số trẻ em
                </label>
                <input
                  type="number"
                  name="youngPeople"
                  placeholder="Nhập số lượng"
                  className="dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-4 dk-appearance-none dk-rounded dk-h-12 dk-w-full dk-border-[2px] dk-border-amber-600 dk-border-dashed dk-max-w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="dk-w-full dk-flex dk-items-center dk-justify-center dk-relative dk-z-10">
            <button className="dk-p-4 dk-flex dk-gap-4 dk-bg-[#F79321] dk-text-sm dk-font-bold dk-font-Roboto dk-rounded dk-text-[#FFf]">
              <SecurityScanOutlined />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
        <div className="search-form dk-flex dk-flex-col dk-h-fit dk-min-h-[220px] dk-w-fit dk-min-w-[760px] dk-p-4 dk-rounded dk-shadow-sm dk-mt-4 content-miss content-miss-v2 dk-gap-5 dk-relative dk-z-10">
          <div className="dk-flex dk-gap-4">
            <h2 className="dk-text-[#FFF] dk-font-bold dk-text-2xl dk-relative dk-z-[14]">
              Combo tốt nhất hôm nay
            </h2>
            <div className="dk-flex dk-items-center dk-p-2 dk-bg-red-200 dk-text-red-500 dk-rounded-xl dk-relative dk-z-[14] dk-h-9 dk-text-sm">
                <img width="20" src="https://res.ivivu.com/hotel/img/fire-sale.svg"/>
                498 khách đã đặt dịch vụ này
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
