"use client";
import Link from "next/link";
import LayoutDefault from "../../components/layouts/LayoutDefault";
import React, { useState } from "react";
import Articles from "modules/Articles";

export default function tour() {
  return (
    <LayoutDefault>
      <div className="content-container content-miss content-news dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-z-10 dk-items-center dk-mb-7 dk-pb-[200px]">
        <div className="dk-w-[1128px] dk-flex dk-flex-col dk-relative dk-max-w-full">
        <Articles/>
        </div>
      </div>
    </LayoutDefault>
  );
}
