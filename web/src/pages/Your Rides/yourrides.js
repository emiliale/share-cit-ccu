import { TreeSelect, Tabs } from 'antd';
import { Typography } from 'antd';
import "./your rides.css"
import "antd/dist/antd.css"
import axios from "axios";
import { Popconfirm } from "antd";

import React, { useState, useEffect } from 'react';
import { List, Avatar, Skeleton, Divider, Button, Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import passengers from "./passengers.json"


const { Title } = Typography;
const { TreeNode } = TreeSelect;
const { TabPane } = Tabs;

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
                description={item.time + "\n" + item.start_location + "->" + item.start_location}
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
                    type="primary"
                    shape="round"
                    className="button"
                    style={{ background: "#eb2f96", borderColor: "#ffffff" }}
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
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then(res => res.json())
      .then(body => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

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
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>
                <Button
                  type="primary"
                  shape="round"
                  className="button"
                  style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                  onClick={info}
                >
                  Change
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  className="button"
                  style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                  onClick={info}
                >
                  Requests
                </Button>
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