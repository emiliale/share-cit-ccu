import React from "react";
import { Layout, Menu, Typography } from "antd";
import { Link, withRouter } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import "./layout.css";
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';


const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;
class CustomLayout extends React.Component {

  render() {
    let isAuth = localStorage.getItem("userId");
    console.log(isAuth);
    const menu = (
      <Menu >
        <Menu.Item key="1">
          <Link to="/profile/">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/your_rides/">Your Rides</Link>
        </Menu.Item>
        <Menu.Item
          key="3" danger
          onClick={() => {
            this.props.logout();
            this.forceUpdate();
          }}
        >Log Out</Menu.Item>
      </Menu>
    );
    return (
      <Layout className="layout" style={{ backgroundColor: "##3241a2" }}>
        <Header style={{ backgroundColor: "#2a3576" }}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              lineHeight: "64px",
              backgroundColor: "#2a3576",
              color: "white",
            }}
          >
            <Menu.Item style={{ float: "left" }} key="3">
              <Link to="/">
                <img
                  width={50}
                  height={50}
                  alt="logo"
                  src="/img/logo_car.png"
                />
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "left" }} key="4">
              <Link to="/">
                <Typography id="sharecit" ><span style={{ color: "#ffff" }}>Share</span><span style={{ color: "#EF3E7E" }}>Cit</span></Typography>
              </Link>
            </Menu.Item>
            {!isAuth ? (
              <>
                <Menu.Item style={{ float: "right" }} key="5">
                  <Link to="/signup/">
                    <Typography style={{ color: "#ffff" }}>Sign up</Typography>
                  </Link>
                </Menu.Item>
                <Menu.Item style={{ float: "right" }} key="6">
                  <Link to="/login/">
                    <Typography style={{ color: "#ffff" }}>Log in</Typography>
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item style={{ marginLeft: 'auto', float: "right" }} key="7" id="nav-dropdown">
                  <Avatar icon={<UserOutlined />} />
                  &nbsp;  &nbsp;
                  <Dropdown overlay={menu}>
                    <a style={{ color: "#ffff" }} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      Menu <DownOutlined />
                    </a>
                  </Dropdown>
                </Menu.Item>
              </>
            )}
            <Menu.Item style={{ float: "left" }} key="8">
              <Link to="/about/">
                <Typography style={{ color: "#ffff" }}>About</Typography>
              </Link>
            </Menu.Item>
            <Menu.Item style={{ float: "left" }} key="9">
              <Link to="/help/">
                <Typography style={{ color: "#ffff" }}>Help</Typography>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
        </Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
