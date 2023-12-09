"use client"
import LayoutDefault from "../../components/layouts/LayoutDefault";
import React from "react";
import { useRouter } from "next/router";
import ArticleContent from "modules/Article";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LayoutDefault>
      <div className="content-container content-miss content-news dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7 dk-pb-[200px]">
        <div className="dk-w-[1128px] dk-flex dk-flex-col dk-relative dk-max-w-full dk-pb-[200px]">
          <ArticleContent id={id?.toString() || ""}/>
        </div>
      </div>
    </LayoutDefault>
  );
}
