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
        width={300}
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
              <Divider orientation="left"></Divider>
              <Collapse accordion>
                <Panel header="Chat" key="1">
                  <p>
                    <Radio.Group name="chat" defaultValue={1}>
                      <Radio value={1}>I like to chat</Radio>
                      <Radio value={2}>I'm okay either way</Radio>
                      <Radio value={3}>I like to be quiet</Radio>
                    </Radio.Group>
                  </p>
                </Panel>
                <Panel header="Pets" key="2">
                  <p>
                    <Radio.Group name="chat" defaultValue={1}>
                      <Radio value={1}>I can take pets</Radio>
                      <Radio value={2}>Pets are sometimes okay</Radio>
                      <Radio value={3}>I can't take pets</Radio>
                    </Radio.Group>
                  </p>
                </Panel>
                <Panel header="Smoking" key="3">
                  <p>
                    <Radio.Group name="chat" defaultValue={1}>
                      <Radio value={1}>I accept smokers</Radio>
                      <Radio value={2}>No smokers</Radio>
                    </Radio.Group>
                  </p>
                </Panel>
                <Panel header="Punctuality" key="4">
                  <p>
                    <Radio.Group name="chat" defaultValue={1}>
                      <Radio value={1}>I'm very punctual</Radio>
                      <Radio value={2}>Small delays are okay</Radio>
                      <Radio value={3}>I'm flexible</Radio>
                    </Radio.Group>
                  </p>
                </Panel>
              </Collapse>

            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Profile;