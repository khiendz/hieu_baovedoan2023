import React from 'react';
import { DownOutlined, UserOutlined, BellFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: 'Thông báo 1',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Thông báo 2',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: 'Thông báo 3',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: 'Thông báo 4',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const Notification: React.FC = () => (
  <Space wrap>
     <Dropdown menu={menuProps}>
      <Button>
          <span className='dk-text-[#FFF]'>Thông báo</span>
          <BellFilled className='dk-text-[#FFF]' twoToneColor="#FFFFFF"/>
      </Button>
    </Dropdown>
  </Space>
);

export default Notification;