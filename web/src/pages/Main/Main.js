import React from "react";
import { Input, Button, DatePicker, TimePicker, InputNumber, Slider} from 'antd';
import { Typography } from 'antd';
import "./main.css"
import "antd/dist/antd.css"
import {
  EuroOutlined
} from '@ant-design/icons';

const { Title } = Typography;

function onChange(date, dateString) {
  console.log(date, dateString);
}


class IconSlider extends React.Component {
  state = {
    value: 0,
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { max, min } = this.props;
    const { value } = this.state;
    const mid = ((max - min) / 2).toFixed(5);
    const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
    return (
      <div className="icon-wrapper">
        <EuroOutlined className={preColorCls} />
        <Slider {...this.props} onChange={this.handleChange} value={value} />
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <center>
        <Title>Search for a ride </Title>
        <Button>Search</Button>
        <Button>Post</Button>

        <Input placeholder="From..." />
        <Input placeholder="To..." />
        <DatePicker onChange={onChange} />
        <TimePicker format="HH:mm" />
        <InputNumber placeholder="Seats" min={1} max={7} onChange={onChange} />
        <IconSlider min={0} />
        </center>
      </div>
    );
  }
}




export default Main;