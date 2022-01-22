import React, { useState } from "react";
import { Input, Button, DatePicker, TimePicker, InputNumber, Form, TreeSelect, Tabs, Modal } from 'antd';
import { Typography } from 'antd';
import "./main.css"
import "antd/dist/antd.css"
import {
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Title } = Typography;
const { TreeNode } = TreeSelect;
const { TabPane } = Tabs;

function onChange(date, dateString) {
  console.log(date, dateString);
}

function info() {
  Modal.info({
    content: (
      <div>
        <p>Your ride has been shared!</p>
      </div>
    ),
    onOk() {},
  });
}

const Tree = () => {
  const [value, setValue] = useState(undefined);
  const onChange = () => {
    setValue(value);
  };
  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Trip Frequency"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
    >
      <TreeNode value="Daily" title="Daily"></TreeNode>
      <TreeNode value="Weekly" title="Weekly"></TreeNode>
      <TreeNode value="Monthly" title="Monthly"></TreeNode>
      <TreeNode value="Esporadic" title="Sporadic"></TreeNode>
    </TreeSelect>
  );
};


class Tab extends React.Component {
  state = { size: 'Large' };

  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { size } = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" type="card" size={size} centered> 
          <TabPane       
            tab={
              <span>
                <SearchOutlined/>
                Search
              </span>
              } 
              key="1">
                <Title className="title">Need a ride?</Title>
        
                <div className="center">
                  <Form layout="inline">
                    <Form.Item>
                      <Input placeholder="From..." />
                    </Form.Item>

                    <Form.Item>
                      <Input placeholder="To..." />
                    </Form.Item>

                    <Form.Item>
                      <DatePicker placeholder="Date" />
                    </Form.Item>

                    <Form.Item>
                      <TimePicker.RangePicker onChange={onChange}  format="HH:mm" />
                    </Form.Item>

                    <Form.Item>
                      <InputNumber placeholder="No. passagenrs" min={1} max={7} onChange={onChange} />
                    </Form.Item>
                  </Form>
                </div>
                <Link to="/choose_rides/">
                  <Button 
                    type="primary"
                    shape="round"
                    className="button"
                    style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                    >
                      Search
                  </Button>
                </Link>
            </TabPane>

          <TabPane       
            tab={
              <span>
                <PlusOutlined/>
                Post
              </span>
              } 
              key="2">

                <Title className="title">Share your ride</Title>
        
                <div className="center">
                  <Form layout="inline">
                    <Form.Item>
                      <Input placeholder="From..." />
                    </Form.Item>

                    <Form.Item>
                      <Input placeholder="To..." />
                    </Form.Item>

                    <Form.Item>
                      <DatePicker placeholder="Date" onChange={onChange} />
                    </Form.Item>

                    <Form.Item>
                    <TimePicker placeholder="Time" format="HH:mm" />
                    </Form.Item>

                    <Form.Item>
                      <InputNumber placeholder="Seats" min={1} max={7} onChange={onChange} />
                    </Form.Item>

                    <Form.Item>
                      <InputNumber 
                        placeholder="Price" 
                        min={1} max={1000000} 
                        onChange={onChange}
                        formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                        />
                    </Form.Item>

                    <Form.Item>
                      <Tree />
                    </Form.Item>
                  </Form>
                </div>
                <Button 
                  type="primary"
                  shape="round"
                  className="button"
                  style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                  onClick={info}
                  >
                    Share
                </Button>
            </TabPane>
        </Tabs>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div >
        <center>
          <Tab />
        </center>
      </div>
    );
  }
}


export default Main;