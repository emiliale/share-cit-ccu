import { Input, Button, DatePicker, TimePicker, InputNumber, Form, TreeSelect, Tabs } from 'antd';
import { Typography } from 'antd';
import "./your rides.css"
import "antd/dist/antd.css"

import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';



const { Title } = Typography;
const { TreeNode } = TreeSelect;
const { TabPane } = Tabs;

function onChange(date, dateString) {
  console.log(date, dateString);
}



const InfiniteListExample = () => {
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
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};


class Tab extends React.Component {
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
                {/* <Title className="title">Your Rides</Title> */}
                <InfiniteListExample />

            </TabPane>

          <TabPane
            tab={
              <span>
                Driver
              </span>
              }
              key="2">

                {/* <Title className="title">Share your ride</Title> */}
                <InfiniteListExample />


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