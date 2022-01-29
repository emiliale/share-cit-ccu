import React, { useState, useEffect } from "react";
import { List, Avatar, Skeleton, Typography, Descriptions, Button, Modal, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./Choose_rides.css"
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";
import riders from "./riders.json"

function info_request() {
  Modal.info({
    content: (
      <div>
        <p>Your request has been sent!</p>
      </div>
    ),
    onOk() { },
  });
}

function info_desc() {
  Modal.info({
    content: (
      <div>
        <p>Your profiles matches 75% of this user!</p>
      </div>
    ),
    onOk() { },
  });
}

const MapWithAMarker = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 38.716832, lng: -9.137989 }}
  >
    <Marker
      position={{ lat: 38.7367235, lng: -9.1325798 }}
    />
    <Marker
      position={{ lat: 38.6765238, lng: -9.165104699999999 }}
    />
    <Polyline
      path={[
        { lat: 38.7367235, lng: -9.1325798 },
        { lat: 38.6765238, lng: -9.165104699999999 }
      ]}
      geodesic={true}
      options={{
        strokeColor: "#ff2527",
        strokeOpacity: 0.75,
        strokeWeight: 2
      }}
    />
  </GoogleMap>
);

const InfiniteListExample = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(riders);

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
              <Typography align='center' style={{ fontSize: "18px", fontWeight: "bold", paddingRight: "10px" }}>{item.price + " €"}</Typography>
              <div>
                <Button
                  shape="round"
                  style={{ background: "#E5E5E5", borderColor: "#ffffff" }}
                  onClick={info_desc}
                >
                  See more
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                  onClick={info_request}
                >
                  Request
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
        <Descriptions className="center" bordered="True" size={"small"} >
          <Descriptions.Item label="From:">{this.props.location.state.from}</Descriptions.Item>
          <Descriptions.Item label="To:">{this.props.location.state.to}</Descriptions.Item>
          <Descriptions.Item label="Date:">{this.props.location.state.date}</Descriptions.Item>
          <Descriptions.Item label="Hour:">{this.props.location.state.time}</Descriptions.Item>
          <Descriptions.Item label="No. passengers" span={2}>{this.props.location.state.seats}</Descriptions.Item>
          <Descriptions.Item label="Preferences:">
            <Tag>No pets</Tag>
            <Tag>No smoking</Tag>
          </Descriptions.Item>
        </Descriptions>

        <div className="row">
          <div className="left-panel box" >
            <InfiniteListExample />
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