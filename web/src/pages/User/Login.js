import React from "react";
import { Form, Input, Button, Spin, Typography, Divider } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

class Login extends React.Component {
  onFinish = (values) => {
    this.props.onAuth(values.username, values.password);
  };
  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage =
        this.props.error.message === "Request failed with status code 400"
          ? "Wrong login"
          : this.props.error.message;
    }
    return (
      <div
        style={{ paddingRight: "30%", paddingLeft: "30%", paddingTop: "3%" }}
      >
        <Title>Log in</Title>
        <Typography>{errorMessage}</Typography>
        <Divider />
        {this.props.loading ? (
          <Spin indicator={<LoadingOutlined />} />
        ) : (
          <Form onFinish={this.onFinish} className="login-form">
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Enter username" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default (
  connect(mapStateToProps, mapDispatchToProps)(Login)
);