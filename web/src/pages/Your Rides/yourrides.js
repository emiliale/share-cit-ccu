import { TreeSelect, Tabs, Popover, Space } from 'antd';
import { Typography } from 'antd';
import "./your rides.css"
import "antd/dist/antd.css"
import { Popconfirm } from "antd";
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { List, Avatar, Skeleton, Divider, Button, Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import passengers from "./passengers.json"
import drivers from "./drivers.json"
import { Link } from 'react-router-dom';


const { Title } = Typography;
const { TreeNode } = TreeSelect;
const { TabPane } = Tabs;

const content = (
  <div>
    <centered>
      <p>Ana Lopes, 25 {" "}
        
      <Space>
        <Button
        shape="round"
        className="button"
        style={{ background: "#ffffff", borderColor: "#eb2f96" }}
        >
          Accept
        </Button>  
        <Button
          shape="round"
          className="button"
          style={{ background: "#ffffff", borderColor: "#eb2f96" }}
        >
          Reject
        </Button>  
        </Space>
      </p>
      <p>Content</p>
      
    </centered>
  </div>
);

function onChange(date, dateString) {
  console.log(date, dateString);
}

function info(name) {
  Modal.info({
    content: (
      <div>
        <p>{`Your request has been cancelled! ${name}`}</p>
      </div>
    ),
    onOk() { },
  });
}


const InfiniteListExample_passenger = () => {
  const [data, setData] = useState(passengers);
  const [pictures, setPictures] = useState([]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          size="large"
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={item.name.first + " " + item.name.last + ", " + item.age}
                description={
                  <div>
                    <p>{item.time}</p>
                    <p>{item.start_location + " -> " + item.stop_location}</p>
                    {item.status != "Active"
                      ? <p style={{ color: "#616161" }}><strong>{item.status}</strong></p>
                      : <p style={{ color: "#31962c" }}><strong>{item.status}</strong></p>}
                  </div>
                }
              />
              <div>
                <Typography align='center' style={{ fontSize: "18px", fontWeight: "bold", paddingRight: "10px" }}>{item.price + " €"}</Typography>
                <Popconfirm
                  title="Are you sure you want to cancel this ride?"
                  onConfirm={() => setData(data.filter(row => row.id != item.id))}
                  onCancel={() => console.log("cancel")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    disabled={item.status != "Active"}
                    ghost={item.status != "Active"}
                    type={"primary"}
                    shape="round"
                    className="button"
                    style={{ background: "#eb2f96", borderColor: "#ffffff", width: "120px" }}
                  >
                    Cancel
                  </Button>
                </Popconfirm>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

const InfiniteListExample_driver = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(drivers);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          size="large"
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<div> <p><FieldTimeOutlined />{"\t" + item.time}</p></div>}
                description={
                  <div>
                    <p>{item.start_location + " -> " + item.stop_location}</p>
                    {item.status != "Active"
                      ? <p style={{ color: "#616161" }}><strong>{item.status}</strong></p>
                      : <p style={{ color: "#31962c" }}><strong>{item.status}</strong></p>}
                  </div>
                }
              />
              <Typography align='center'
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  paddingRight: "50px",
                  paddingTop: "18px"
                }}>
                <p>{item.price + " €"}</p>
                <p>{item.seats + " "}<UserOutlined /></p>
              </Typography>
              <div>
                <Link to={{ pathname: "/edit_ride/" }}>
                  <Button
                    disabled={item.status != "Active"}
                    ghost={item.status != "Active"}
                    type={"primary"}
                    shape="round"
                    className="button"
                    style={{ background: "#eb2f96", borderColor: "#ffffff", width: "120px" }}
                  >
                    Change
                  </Button>
                </Link>
                <Popover content={content} title="Requests">
                  <Button
                    disabled={item.status != "Active"}
                    ghost={item.status != "Active"}
                    type={"primary"}
                    shape="round"
                    className="button"
                    style={{ background: "#eb2f96", borderColor: "#ffffff", width: "120px" }}
                  >
                    Requests
                  </Button>
                </Popover>
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};



class YourRides extends React.Component {
  state = { size: 'Large' };

  onChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" type="card" size={size} centered>
          <TabPane
            tab={
              <span>
                Passenger
              </span>
            }
            key="1">
            <InfiniteListExample_passenger />
          </TabPane>
          <TabPane
            tab={
              <span>
                Driver
              </span>
            }
            key="2">
            <InfiniteListExample_driver />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default YourRides;