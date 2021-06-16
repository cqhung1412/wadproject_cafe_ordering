import React, { Component, Fragment } from 'react'

import { Form, Input, Button, Image, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './LoginLayout.less'
import logo from '../assets/images/coffee.svg'

const { Title } = Typography;

export default class LoginLayout extends Component {
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { onLogin, submitLoading } = this.props;

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
            <Title level={1} style={{ marginLeft: '10px', color: 'darkorange' }}>Coffee•Hut</Title>
          </div>
          <div>
            <Form
              name="login"
              onFinish={(values) => onLogin(values)}
              onFinishFailed={this.onFinishFailed}
            >
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
              <Form.Item>
                <Button loading={submitLoading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Login
                </Button>
              </Form.Item>
              <Form.Item name="actions" valuePropName="checked" initialValue={false}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Button type='link' onClick={() => { }} >
                    Forgot your password D:
                  </Button>
                  <Button type='default' >
                    Create your account :D
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
