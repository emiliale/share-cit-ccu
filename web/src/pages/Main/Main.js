import React, { useState } from "react";
import { Input, Button, DatePicker, TimePicker, InputNumber, Form, TreeSelect, Tabs, Modal, Typography } from 'antd';
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
      style={{ width: '100%', borderRadius: '100px' }}
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
  state = { size: 'Large', from: '', to: '', date: '', time:'', seats: ''};
  
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
  }

  getValue = (val, e) => {
    this.setState({ [val]: e });
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
                      <Input style={{borderRadius: '100px'}} placeholder="From..."  
                        onChange={(e) => { this.getValue('from', e.target.value) }}
                      />                   
                    </Form.Item>

                    <Form.Item>
                      <Input style={{borderRadius: '100px'}} placeholder="To..." 
                      onChange={(e) => { this.getValue('to', e.target.value) }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Input style={{borderRadius: '100px'}} type="date" placeholder="Date" 
                      onChange={(e) => { this.getValue('date', e.target.value) }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Input style={{borderRadius: '100px'}} type="time" placeholder="Time" 
                        onChange={(e) => { this.getValue('time', e.target.value) }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Input style={{borderRadius: '100px', width: '150px'}} type="number" placeholder="No. passengers" min={1} max={7}
                      onChange={(e) => { this.getValue('seats', e.target.value) }}
                      />
                    </Form.Item>
                  </Form>
                </div>
                
                <Link
                  to={{
                    pathname: "/choose_rides/",
                    state:  this.state 
                  }}
                >
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
                      <Input style={{borderRadius: '100px'}} placeholder="From..." />
                    </Form.Item>

                    <Form.Item>
                      <Input style={{borderRadius: '100px'}} placeholder="To..." />
                    </Form.Item>

                    <Form.Item>
                      <Input style={{borderRadius: '100px'}} type="date" placeholder="Date" />
                    </Form.Item>

                    <Form.Item>
                    <Input style={{borderRadius: '100px'}} type="time" placeholder="Time" />
                    </Form.Item>

                    <Form.Item>
                      <Input style={{borderRadius: '100px'}} type="number" placeholder="Seats" min={1} max={7} />
                    </Form.Item>

                    <Form.Item>
                      <Input
                        style={{borderRadius: '100px'}}
                        placeholder="Price"
                        min={1} max={1000000}
                        prefix="€"
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