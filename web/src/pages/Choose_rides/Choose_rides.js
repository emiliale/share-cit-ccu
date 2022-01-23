import React, { useState, useEffect } from "react";
import { List, Avatar, Skeleton, Divider, Descriptions, Button, Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./Choose_rides.css"
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


function info_request() {
  Modal.info({
    content: (
      <div>
        <p>Your request has been sent!</p>
      </div>
    ),
    onOk() {},
  });
}

function info_desc() {
  Modal.info({
    content: (
      <div>
        <p>Your profiles matches 75% of this user!</p>
      </div>
    ),
    onOk() {},
  });
}

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
);

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
        endMessage={<Divider plain><span role="img" aria-label="smile">It is all, nothing more 🤐</span></Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a >{item.name.last}</a>}
                description={item.email}
              />
              <div>
                <Button 
                  type="primary"
                  shape="round"
                  className="button"
                  style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                  onClick={info_request}
                  >
                    Request
                </Button> 
                <Button 
                  type="primary"
                  shape="round"
                  className="button"
                  style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                  onClick={info_desc}
                  >
                    See more
                </Button> 
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>

    </div>


  );
};


class Choose_rides extends React.Component {
  render() {
    return (
      <div>
        <Descriptions className="center" bordered size={"small"} >
            <Descriptions.Item  label="From:" >Alameda</Descriptions.Item>
            <Descriptions.Item label="To:">Saldanha</Descriptions.Item>
            <Descriptions.Item label="Date:">26.12.2021</Descriptions.Item>
            <Descriptions.Item label="Hour:">18:00</Descriptions.Item>
            <Descriptions.Item label="No. passengers" span={2}>1</Descriptions.Item>
        </Descriptions>
        <div className="row">
        <div className="left-panel box" >

        <InfiniteListExample/>
        </div>

        <div className="right-panel box">
        <MapWithAMarker
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        </div>
        </div>
      </div>
    );
  }
}

export default Choose_rides;