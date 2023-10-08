'use client'
import React from 'react';
import { Select, Space } from 'antd';

const { Option } = Select;

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const SelectBox: React.FC = () => (
  <Select
    className="field dk-outline-none dk-text-sm dk-relative dk-z-[2] dk-text-[#222] dk-bg-[#FFF] dk-px-8 dk-appearance-none dk-rounded dk-h-12 dk-w-full 
    dk-border-[2px] dk-border-amber-600 dk-border-dashed"
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Lựa chọn thể loại sách"
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="1" label="Toán">
      <Space>
        Toán
      </Space>
    </Option>
    <Option value="2" label="Thời sự">
      <Space>
        Thời sự
      </Space>
    </Option>
    <Option value="3" label="Bí ẩn">
      <Space>
        Bí ẩn 
      </Space>
    </Option>
    <Option value="korea" label="Korea">
      <Space>
        Tiếng Hàn
      </Space>
    </Option>
  </Select>
);

export default SelectBox;