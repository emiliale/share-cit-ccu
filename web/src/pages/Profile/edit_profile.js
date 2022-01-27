import React from "react";
import { Typography, Input, Collapse, Divider, Radio, Upload, Space, Button } from 'antd'
import { Link } from "react-router-dom";
import {
    LoadingOutlined, 
    PlusOutlined,
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
          <div style={{ marginTop: 8 }}>Upload</div>
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
                <div className="row"> 
                
                    <div className="left-panel box" >
                        <Title>Your Profile</Title>
                        <Divider orientation="left"></Divider>
                        <Space direction="vertical">
                            <Avatar />
                             <Input placeholder="Name" /> 
                             
                             <Button type="primary">Save</Button>

                             <Input placeholder="Age" /> 
                             
                             <Button type="primary">Save</Button>
                             
                             
                             <Input placeholder="City" /> 
                             
                             <Button type="primary">Save</Button>      

                             <Input placeholder="Car Model" /> 
                             
                             <Button type="primary">Save</Button>
                                               </Space>

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