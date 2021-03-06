import React from "react";
import { Form, Input, Button, Spin, Typography, Divider } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import {
  LoadingOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    disabled: false,
  };

  onFinish = (values) => {
    this.setState({ disabled: true });
    this.props.onAuth(
      values.userName,
      values.email,
      values.password,
      values.confirm
    );
    this.setState({ disabled: false });
  };

  render() {
    return (
      <div
        style={{ paddingRight: "30%", paddingLeft: "30%", paddingTop: "3%" }}
      >
        {this.props.loading ? (
          <Spin indicator={<LoadingOutlined />} />
        ) : (
          <div>
            <Title>Sign up</Title>
            <Divider/>
            <Form onFinish={this.onFinish}>
              <FormItem
                name="userName"
                rules={[{ required: true, message: "Enter username" }]}
                >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                />
              </FormItem>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail",
                  },
                  {
                    required: true,
                    message: "E-mail",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="E-mail"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Enter password",
                  },
                  () => ({
                    validator(rule, value) {
                      if (!value || value.length >= 6) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Password must be a minimum of 6 characters");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Confirm password",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject("The two passwords that you entered do not match");
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Confirm password"
                />
              </Form.Item>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "10px" }}
                  disabled={this.props.loading || this.state.disabled}
                >
                  Sign up
                </Button>
                or
                <NavLink style={{ marginRight: "10px" }} to="/login/">
                  {" "}
                  Log in
                </NavLink>
              </FormItem>
            </Form>
          </div>
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
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};

export default (
  connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
);