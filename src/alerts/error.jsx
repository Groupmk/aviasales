import React from 'react';
import { Alert, Space } from 'antd';
const Error = ({ message }) => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Error" type="error" showIcon />
    <Alert
      message={message}
      description="М-да, не удобно получилось, ну, с кем не бывает ?! 	&#128579;"
      type="error"
      showIcon
    />
  </Space>
);
export default Error;
