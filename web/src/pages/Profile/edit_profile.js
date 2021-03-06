import React from "react";
import { Typography, Input, Collapse, Divider, Radio, Upload, Space, Button, Form } from 'antd'
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  PlusOutlined,
  ArrowLeftOutlined
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
        <div style={{ marginTop: 8 }}>Upload a photo</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

class Profile extends React.Component {
  render() {
    return (
      <div>
        <center>
          <Link to="/Profile/"><Button type="link " style={{ marginLeft: 'auto', float: "left" }}> <ArrowLeftOutlined /> Go back </Button></Link>
          <div className="row">
            <div className="left-panel box" >
              <Title>Edit your Profile</Title>
              <Divider orientation="left"></Divider>
              <Space direction="vertical">
                <Avatar />
                <Divider orientation="left"></Divider>
                <Form>
                  <h1>Personal information</h1>
                  <Divider orientation="left"></Divider>
                  <Row justify="space-around" align="middle">
                    <Col span={10}>
                      <Form.Item style={{margin:"10px"}}>
                        <Input placeholder="Name" style={{ borderRadius: '100px' }} />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                    <Form.Item style={{margin:"10px"}}>
                        <Input placeholder="City" style={{ borderRadius: '100px' }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                    <Form.Item style={{margin:"10px"}}>
                        <Input placeholder="Age" style={{ borderRadius: '100px' }} />
                      </Form.Item>
                    </Col>
                    <Col span={24}> <Form.Item>
                      <Button
                        type="primary"
                        className="button"
                        shape="round"
                        style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                      >
                        Save
                      </Button>
                    </Form.Item></Col>
                  </Row>
                  <Divider orientation="left"></Divider>
                  <h1>Car information</h1>
                  <Divider orientation="left"></Divider>
                  <Row justify="space-around" align="middle">
                    <Col span={8}>
                    <Form.Item style={{margin:"10px"}}>
                        <Input placeholder="Car" style={{ borderRadius: '100px' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item style={{margin:"10px"}}>
                        <Input placeholder="Car type " style={{ borderRadius: '100px' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item style={{margin:"10px"}}>
                        <Input placeholder="License plate" style={{ borderRadius: '100px' }} />
                      </Form.Item>
                    </Col>
                    <Col span={24}> <Form.Item>
                      <Button
                        type="primary"
                        className="button"
                        shape="round"
                        style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                      >
                        Save
                      </Button>
                    </Form.Item></Col>
                  </Row>
                  <Divider orientation="left"></Divider>
                  <h1>Preferences</h1>
                  <Divider orientation="left"></Divider>
                </Form>
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
              </Space>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default Profile;