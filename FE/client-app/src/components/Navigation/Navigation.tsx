'use client'

import React, { useState } from 'react';
import { HomeOutlined, EditOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    label: <Link href='/' className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'>TRANG CHỦ</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link href='/tin-tuc' className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'><span>Tin tức</span></Link>,
    key: 'news',
    icon: <EditOutlined />
  },
  {
    label: <Link href='/introduce' className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'><span>Giới thiệu</span></Link>,
    key: 'tour',
    children: [
      {
        label: <Link href='/introduce/offline' className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'><span>Sách offline</span></Link>,
        key: 'local'
      },
      {
        label: <Link href='/introduce/online' className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'><span>Sách online</span></Link>,
        key: 'global'
      },
    ],
  },
  {
    label: (
      <Link href="/san-pham" rel="noopener noreferrer" className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'>
        Sản phẩm
      </Link>
    ),
    key: 'airplane',
  },
  {
    label: (
      <Link href="/doc-gia" rel="noopener noreferrer" className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'>
        Quản lý độc giả
      </Link>
    ),
    key: 'doc-gia',
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <nav>
    <Menu className="dk-text-[#222] dk-text-lg dk-font-bold dk-py-3 dk-border-none dk-shadow-md dk-font-Inter" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </nav>;
};

export default Navigation;