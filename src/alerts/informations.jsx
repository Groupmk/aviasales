import React from 'react';
import { Alert, Space } from 'antd';
const Informational = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Informational" type="info" showIcon />
    <Alert
      message="Уже ищем потеряшку!"
      description="Какой-то негодяй спрятал все билеты, да, досадно! Попробуй посмотреть в другом месте &#128270;."
      type="info"
      showIcon
    />
  </Space>
);
export default Informational;
