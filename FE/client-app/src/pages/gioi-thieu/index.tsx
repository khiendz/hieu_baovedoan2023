"use client";
import LayoutDefault from "../../components/layouts/LayoutDefault";
import React from "react";

export default function tour() {
  return (
    <LayoutDefault>
      <div className="introduce content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7">
        <h1 className="dk-Inter dk-leading-6 dk-font-semibold dk-text-2xl dk-border-b-[1px] dk-border-[#222] dk-pb-5 dk-w-[1128px]">
          Giới thiệu chung
        </h1>
        <div className="dk-w-[1128px] dk-min-w-[1128px] dk-max-w-[1128px] dk-flex dk-flex-col dk-relative">
          <div className="highlight dk-flex dk-gap-10 dk-justify-between dk-w-full dk-relative">
            <img
              className="dk-w-[516] dk-aspect-[3/2]"
              src="https://cdnphoto.dantri.com.vn/wcqB4Q87A6uaUcob24dASvFtnPk=/zoom/774_516/2023/10/10/ngapthuducnamanhnama6500-1696920290877.jpg"
            />
            <div className="document dk-flex dk-flex-col dk-w-full dk-relative">
              <h2 className="dk-flex dk-items-center dk-align-middle dk-font-semibold dk-text-base dk-font-Inter dk-h-8 dk-px-4 dk-bg-[#8b0000] dk-text-[#FFF]">
                Tài liệu thư viện quốc gia 1000 năm
              </h2>
              <a href="/">
                <img
                  className="dk-mt-5"
                  src="https://nlv.gov.vn/images/stories/banner/100-nam-TVQG-2017-3.jpg"
                />
              </a>
              <h2 className="dk-flex dk-items-center dk-align-middle dk-font-semibold dk-text-base dk-font-Inter dk-h-8 dk-px-4 dk-bg-[#8b0000] dk-text-[#FFF] dk-mt-5">
                Các phòng ban
              </h2>
              <ul className="dk-text-xs dk-font-Roboto dk-font-normal dk-pl-8 dk-w-full dk-h-fit dk-p-4 dk-bg-[#FFEBA7] dk-text-[#8b0000] dk-list-disc dk-px-[15px] list-marker">
                <li>
                  <a href="/">Phòng lưu chiểu</a>
                </li>
                <li>
                  <a href="/">Phòng bổ sung</a>
                </li>
                <li>
                  <a href="/">Phòng trao đổi</a>
                </li>
                <li>
                  <a href="/">Phòng hỗ trợ</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
}
