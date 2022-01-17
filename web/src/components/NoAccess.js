import React from "react";
import { Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const { Title } = Typography;

class NoAccess extends React.Component {
  render() {
    return (
      <div>
        <Title>
          <InfoCircleOutlined /> You have to login in to see this page
        </Title>
      </div>
    );
  }
}

export default NoAccess;
