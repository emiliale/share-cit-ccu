import React from "react";
import { Collapse, Descriptions } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import "./Choose_rides.css"


const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Choose_rides extends React.Component {
  render() {
    return (
      <div>
        <Descriptions className="center" bordered>
            <Descriptions.Item label="From:">Alameda</Descriptions.Item>
            <Descriptions.Item label="To:">Saldanha</Descriptions.Item>
            <Descriptions.Item label="Date:">26.12.2021</Descriptions.Item>
            <Descriptions.Item label="Hour:">18:00</Descriptions.Item>
            <Descriptions.Item label="No. passengers" span={2}>1</Descriptions.Item>
        </Descriptions>

        <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
        >
            <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
                <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
                <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
                <p>{text}</p>
            </Panel>
        </Collapse>
      </div>
    );
  }
}

export default Choose_rides;