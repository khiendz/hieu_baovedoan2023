'use client'

import React, { useState } from 'react';
import { HomeOutlined, EditOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';
import { useAppContext } from 'hook/use-app-context';

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
    label: (
      <Link href="/san-pham" rel="noopener noreferrer" className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'>
        Sản phẩm
      </Link>
    ),
    key: 'airplane',
  },
  {
    label: (
      <Link href="/history-borowd" rel="noopener noreferrer" className='dk-text-sm dk-text-[#222] dk-font-Inter dk-font-bold'>
        Lịch sử thuê sách
      </Link>
    ),
    key: 'history-borowd',
  },
];

const Navigation: React.FC = () => {
  const { data: user } = useAppContext("user");
  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <nav>
    <Menu className={`dk-text-[#222] dk-text-lg dk-font-bold dk-py-3 dk-border-none dk-shadow-md dk-font-Inter`} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </nav>;
};

export default Navigation;