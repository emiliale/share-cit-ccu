import React, { useState } from "react";
import { Input, Button, DatePicker, TimePicker, InputNumber, Form, TreeSelect, Tabs, Modal, Typography } from 'antd';
import "./main.css"
import "antd/dist/antd.css"
import {
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import PlaceAutocompleteComponent from "./components/PlaceAutocompleteComponent";


const { Title } = Typography;
const { TreeNode } = TreeSelect;
const { TabPane } = Tabs;

function onChange(date, dateString) {
  console.log(date, dateString);
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
  state = { size: 'Large', from: '', to: '', date: '', time: '', seats: '' };

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
        <Title className="title">Edit your ride!</Title>

        <div className="center">
            <Form layout="inline">
            <Form.Item style={{ height: "20px" }}>
                <PlaceAutocompleteComponent
                placeholder="From..."
                setCoordinates={(lat, lng) => console.log(lat, lng)}
                setAddress={(value) => this.getValue('to', value)}
                />
            </Form.Item>
            <Form.Item style={{ height: "20px" }}>
                <PlaceAutocompleteComponent
                placeholder="To..."
                setCoordinates={(lat, lng) => console.log(lat, lng)}
                setAddress={(value) => this.getValue('to', value)}
                />
            </Form.Item>
            <Form.Item>
                <Input style={{ borderRadius: '100px' }} type="date" placeholder="Date" />
            </Form.Item>

            <Form.Item>
                <Input style={{ borderRadius: '100px' }} type="time" placeholder="Time" />
            </Form.Item>

            <Form.Item>
                <Input style={{ borderRadius: '100px' }} type="number" placeholder="Seats" min={1} max={7} />
            </Form.Item>

            <Form.Item>
                <Input
                style={{ borderRadius: '100px' }}
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
        <Link to={{ pathname: "/your_rides/" }} >
            <Button
                type="primary"
                shape="round"
                className="button"
                style={{ background: "#eb2f96", borderColor: "#ffffff" }}
            >
                Confirm
            </Button>
        </Link>    
    </div>
    );
  }

}

class EditRide extends React.Component {
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


export default EditRide;