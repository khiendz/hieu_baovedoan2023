"use client";
import LayoutDefault from "../../components/layouts/LayoutDefault";
import React from "react";
import Articles from "modules/Articles";

export default function tour() {
  return (
    <LayoutDefault>
      <div className="content-container content-miss content-news dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7 dk-pb-[200px]">
        <div className="dk-w-[1080px] dk-flex dk-flex-col dk-relative dk-max-w-full dk-py-[100px] dk-gap-8">
          <h1 className="dk-font-semibold dk-text-[40px] dk-w-full dk-flex dk-justify-center">
            Cập nhật tin tức mới nhất 24/7
          </h1>
        <Articles/>
        </div>
      </div>
    </LayoutDefault>
  );
}
