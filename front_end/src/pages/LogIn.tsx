import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Layout, Row, Space, Typography, Button, Input, Col } from 'antd';

import classes from '../styles/auth.module.css';

import { useLoginMutation } from '../lib/apolloHooks';

const { Text } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const [errorRes, setErrRes] = useState('');

  const [handleLogin, { loading, error }] = useLoginMutation();

  useEffect(() => {
    if (Cookies.get('login-info')) {
      navigate('/');
    }
  }, []);

  const onFinish = async (value: any) => {
    setErrRes('');
    try {
      const { data } = await handleLogin({
        variables: { input: value },
      });

      if (data) {
        const { expiresAt, token } = data.login!;

        Cookies.set('login-info', token, expiresAt);
      }

      navigate('/game');
    } catch (_) {
      if (error) {
        setErrRes(error?.graphQLErrors[0].message);
        return;
      }

      setErrRes('Invalid credentials');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center', overflow: 'hidden' }}>
      <div className={classes.row}>
        <div className={`${classes.wrapper} ${classes.col}`}>
          <Row justify={'center'} style={{ marginBottom: '10px' }}>
            <Space direction="vertical" align="center" size={'small'}>
              <Text strong style={{ fontSize: '1.4em' }}>
                Log in to you account
              </Text>
            </Space>
          </Row>
          <Row>
            <Form onFinish={onFinish} style={{ width: '100%' }}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  { required: true, message: 'Please input your Email!' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" block>
                  Log in
                </Button>
                <Link to="/auth/register">or Register!</Link>
              </Form.Item>
            </Form>
            {errorRes !== '' && <Text style={{ color: 'red' }}>{errorRes}</Text>}
          </Row>
        </div>
        <div className={`${classes.bg} ${classes.col}`}></div>
      </div>
    </Layout>
  );
}
