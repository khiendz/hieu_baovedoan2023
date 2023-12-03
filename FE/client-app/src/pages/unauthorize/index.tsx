"use client";
import LayoutDefault from "components/layouts/LayoutDefault";
import Unauthorize from "modules/Unauthorize";
import React from "react";

export default function UnauthorizePage() {
  
  return (
    <LayoutDefault>
      <div className="content-container content-miss dk-flex dk-flex-col dk-font-Roboto dk-gap-4 dk-relative dk-z-10">
        <Unauthorize/>
      </div>
    </LayoutDefault>
  );
}
