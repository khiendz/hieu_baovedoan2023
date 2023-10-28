"use client";
import React from "react";
import { Select, Space } from "antd";
import { BookType } from "Models/BookType";

const { Option } = Select;

type Props = {
  data: BookType[];
  setTag: any;
};

const SelectBox: React.FC<Props> = (props: Props) => {
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      className="field dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full 
    dk-border-[2px] dk-border-amber-600 dk-border-dashed"
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="Lựa chọn thể loại sách"
      onChange={handleChange}
      optionLabelProp="label"
    >
      {props?.data?.length > 0
        ? props?.data?.map((ele, index) => (
            <Option key={index} label={ele.Name}>
              <Space>{ele.Name}</Space>
            </Option>
          ))
        : null}
    </Select>
  );
};

export default SelectBox;
