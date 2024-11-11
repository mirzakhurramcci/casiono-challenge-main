import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form, Layout, Row, Space, Typography, Button, Input, Col, DatePicker, Modal } from 'antd';

import classes from '../styles/auth.module.css';
import { useRegisterMutation } from '../lib/apolloHooks';

const { Text } = Typography;

function containsNumbers(pass: string) {
  return /\d/.test(pass);
}

function containsUppercase(pass: string) {
  return /[A-Z]/.test(pass);
}
export default function Register() {
  const navigate = useNavigate();

  const [errorRes, setErrRes] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [handleRegister, { loading, error }] = useRegisterMutation();

  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/auth/login');
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
    navigate('/auth/login');
  };

  useEffect(() => {
    if (Cookies.get('login-info')) {
      navigate('/');
    }
  }, []);

  const onFinish = async (value: any) => {
    setErrRes('');
    try {
      const { data } = await handleRegister({
        variables: { input: value },
      });

      if (data) setIsModalOpen(true);
    } catch (_) {
      console.log(_);
      console.log(error);

      setErrRes('Something went wrong!');
      if (error) {
        setIsModalOpen2(true);
      }
    }
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh', justifyContent: 'center', overflow: 'hidden' }}>
        <div className={classes.row}>
          <div className={`${classes.wrapper} ${classes.col}`}>
            <Row justify={'center'} style={{ marginBottom: '10px' }}>
              <Space direction="vertical" align="center" size={'small'}>
                <Text strong style={{ fontSize: '1.4em' }}>
                  Create new account
                </Text>
              </Space>
            </Row>
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

              <Form.Item
                name="dob"
                rules={[
                  { required: true, message: 'Please input your Date of birth!' },
                  (_) => ({
                    validator(__, value) {
                      if (!value) return Promise.resolve();

                      const today = dayjs();
                      const dateDiff = today.diff(value, 'year');

                      if (dateDiff < 18) return Promise.reject(new Error('Age should be higher than 18 years to register'));
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker placeholder="Date of birth" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  { min: 8, message: 'Password must be minimum 8 characters.' },
                  (_) => ({
                    validator(__, value) {
                      if (!value) return Promise.resolve();
                      else {
                        if (!containsNumbers(value) || !containsUppercase(value))
                          return Promise.reject(new Error('Make sure your password has at least one number and one uppercase letter!'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" block>
                  Register
                </Button>
                <Link to="/auth/login">or Login!</Link>
              </Form.Item>
            </Form>
            {errorRes !== '' && <Text style={{ color: 'red' }}>{errorRes}</Text>}
          </div>
          <div className={`${classes.bg} ${classes.col}`}></div>
        </div>
      </Layout>

      <Modal centered open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <img src="/success.png" width="100%" alt="bg" />
        <h3>Success!</h3>
        <p>
          Congratulations, you have successfully registered. <br /> Please login to continue.
        </p>
      </Modal>
      <Modal centered open={isModalOpen2} onOk={handleOk2} onCancel={() => setIsModalOpen2(false)}>
        <h3>Error!</h3>
        <p>
          You are already registered.
          <br /> Please login to continue.
        </p>
      </Modal>
    </>
  );
}
