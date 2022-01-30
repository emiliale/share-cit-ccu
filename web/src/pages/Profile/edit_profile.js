import React from "react";
import { Typography, Input, Collapse, Divider, Radio, Upload, Space, Button, Form } from 'antd'
import { Link } from "react-router-dom";
import {
    LoadingOutlined, 
    PlusOutlined,
    ArrowLeftOutlined 
  } from '@ant-design/icons';

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
                          <Form layout="inline">
                            <Form.Item>
                              <Input placeholder="Name" style={{ borderRadius: '100px' }} />                             
                              <Button 
                                type="primary" 
                                className="button" 
                                shape="round" 
                                style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                                >
                                Save
                              </Button> 
                            </Form.Item>
                            <Form.Item>
                              <Input placeholder="Age" style={{ borderRadius: '100px' }} />                
                              <Button 
                                type="primary" 
                                className="button" 
                                shape="round" 
                                style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                              >
                                Save
                              </Button> 
                            </Form.Item>
                            <Form.Item>
                              <Input placeholder="City" style={{ borderRadius: '100px' }}/> 
                              <Button 
                                type="primary" 
                                className="button" 
                                shape="round" 
                                style={{ background: "#eb2f96", borderColor: "#ffffff" }}
                              >
                                Save
                              </Button>   
                            </Form.Item>
                            <Form.Item>
                              <Input placeholder="Car Model" style={{ borderRadius: '100px' }}/> 
                              <Button 
                                type="primary" 
                                className="button" 
                                shape="round" 
                                style={{ background: "#eb2f96", borderColor: "#ffffff" }}                             
                              >
                                Save
                              </Button>
                            </Form.Item>
                            <Form.Item>
                            <Input placeholder="License plate" style={{ borderRadius: '100px' }}/> 
                              <Button 
                                type="primary" 
                                className="button" 
                                shape="round" 
                                style={{ background: "#eb2f96", borderColor: "#ffffff" }}                             
                              >
                                Save
                              </Button>           
                            </Form.Item>
                          </Form>
                        </Space>
                    </div>    
                </div>    
          </center> 
      </div>
    );
  }
}

export default Profile;