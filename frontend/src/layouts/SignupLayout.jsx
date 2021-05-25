import React, { Component, Fragment } from 'react'

import { Form, Input, Button, Image, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './LoginLayout.css'
import logo from '../assets/images/coffee.svg'

const { Title } = Typography;

export default class SignupLayout extends Component {
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { onSignup, submitLoading } = this.props;

    return (
      <Fragment>
        <div className='area' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Image src={logo} width={50} preview={false} />
            <Title level={1} style={{ marginLeft: '10px', color: 'whitesmoke' }} >Presence</Title>
          </div>
          <div>
            <Form
              name="login"
              onFinish={(values) => onSignup(values)}
              onFinishFailed={this.onFinishFailed}
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'stretch' }}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                  style={{marginRight: '5px'}}
                >
                  <Input placeholder={'First Name'} />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <Input placeholder={'Last Name'} />
                </Form.Item>
              </div>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder={'Enter your email'} prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder={'Enter your password'} prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: 'Please enter the same password!' }]}
              >
                <Input.Password placeholder={'Confirm your password'} prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button loading={submitLoading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Signup
                </Button>
              </Form.Item>
              <Form.Item name="actions" valuePropName="checked" initialValue={false}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'right' }}>
                  <Button type='link' >
                    Login with your account :D
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Fragment>
    )
  }
}
