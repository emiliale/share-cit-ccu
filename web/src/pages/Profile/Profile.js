import React from "react";
import { Typography, Button, Collapse, Divider, Radio, Image, Space } from 'antd'
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  PlusOutlined,
  StarOutlined
} from '@ant-design/icons';
import { Row, Col } from 'antd';

const { Title, Text } = Typography;

const { Panel } = Collapse;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <img
        width={230}
        style={{ borderRadius: '50%' }}
        src={localStorage.getItem("userId") == 1 ? "/img/mine.jpg" : "/img/profile_picture.jpg"}
      />
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <div>
        <center>
          <Link to="/Edit_Profile/"><Button type="link " style={{ marginLeft: 'auto', float: "right" }}> Edit profile </Button></Link>
          <div className="row">
            <div className="left-panel box" >
              <Title>Your Profile</Title>
              <Divider orientation="left"></Divider>
              <Space direction="vertical">
                <Avatar />
                <h1>{localStorage.getItem("userId") == 1 ? "Emilia" : "-"}</h1>
                <h3>{localStorage.getItem("userId") == 1 ? "24 years old, Alameda" : "-"}</h3>
              </Space>
              <h3 style={{ color: "#757575" }}>{localStorage.getItem("userId") == 1 ? "Mercedes-Benz AMG GT, PL-04-EU" : "-"}</h3>
              <Divider orientation="left"></Divider>
              <Row justify="space-around" align="middle">
                <Col span={6}></Col>
                <Col span={6}><h1>{localStorage.getItem("userId") == 1 ? "5.0\t" : "-"}<StarOutlined /></h1></Col>
                <Col span={6}><h1>{localStorage.getItem("userId") == 1 ? "4.9\t" : "-"}<StarOutlined /></h1></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}><h3>driver</h3></Col>
                <Col span={6}><h3>passenger</h3></Col>
                <Col span={6}></Col>
              </Row>
            </div>
            <div className="right-panel box" >
              <Title>Your Preferences</Title>
              <Divider orientation="left" style={{marginBottom: "100px"}}></Divider>
              <Row justify="start" align="middle">
                <Col span={8}><img width={40} src="/img/chat.png"></img></Col>
                <Col span={12}><h1>I like to chat</h1></Col>
                <Col span={4}></Col>
                <Divider orientation="left"></Divider>
                <Col span={8}><img width={40} src="/img/pet.png"></img></Col>
                <Col span={12}><h1>Pets are negotiable</h1></Col>
                <Col span={4}></Col>
                <Divider orientation="left"></Divider>
                <Col span={8}><img width={40} src="/img/smoke.png"></img></Col>
                <Col span={12}><h1>No smokres</h1></Col>
                <Col span={4}></Col>
                <Divider orientation="left"></Divider>
                <Col span={8}><img width={40} src="/img/time.png"></img></Col>
                <Col span={12}><h1>I'm very punctual</h1></Col>
                <Col span={4}></Col>
              </Row>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Profile;