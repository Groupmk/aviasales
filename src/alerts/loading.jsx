import React from 'react';
import { Alert, Space } from 'antd';
const Loading = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Informational" type="info" showIcon />
    <Alert
      message="Скоро взлетим!"
      description="Наш небесный мопед немного барахлит, подождите немного &#128521;."
      type="info"
      showIcon
    />
  </Space>
);
export default Loading;
