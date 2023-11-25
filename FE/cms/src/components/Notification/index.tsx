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
    label: 'Cập nhật ưu đãi',
    key: '1',
  },
  {
    label: 'Báo cáo thuê sách',
    key: '2',
  },
  {
    label: 'Báo cáo kho sách tháng 11',
    key: '3',
    danger: true,
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