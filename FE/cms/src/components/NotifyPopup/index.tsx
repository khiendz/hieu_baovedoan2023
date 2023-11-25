import React, { useEffect, useRef, useState, useMemo } from "react";
import { notification } from "antd";
import { SmileOutlined, RobotOutlined } from '@ant-design/icons';
import { NotificationPlacement } from "antd/es/notification/interface";

const Context = React.createContext({ name: "Default" });

interface Props {
  messagePopup: string,
  setPopup: any,
  title: string,
  state: boolean
}

const NotifYPopup: React.FC<Props> = (props: Props) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (props.messagePopup && props.messagePopup != "")
    openNotification('topRight');
  }, [props]);

  const openNotification = (placement: NotificationPlacement) => {
    api.info(
      {
      
      message: `${props.title ? props.title : "Thành công"}`,
      description: (
        props.messagePopup || ""
      ),
      placement,
      icon: props.state ? <SmileOutlined style={{ color: '##a0db8e' }} /> : <RobotOutlined style={{ color: '##f26522' }} />,
    });
    props.setPopup("");
  };
  
  return <>
  {contextHolder}
  </>;
};

export default NotifYPopup;