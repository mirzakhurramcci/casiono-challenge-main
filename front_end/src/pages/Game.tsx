import React, { useContext, useState } from 'react';

import Cookies from 'js-cookie';
import { Button, Form, Input, Modal, Typography } from 'antd';
import AnimatedNumbers from 'react-animated-numbers';

import { UserContext } from '../context/user';

import { useMeQuery, useQueryQuery, useRedeemCouponMutation, useStartGameMutation } from '../lib/apolloHooks';

import classes from '../styles/game.module.css';

const { Text } = Typography;

export default function Game() {
  const [number, setNumber] = useState(111);
  const [user, setUser] = useContext(UserContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newCtx = {
    context: {
      headers: {
        authorization: 'Bearer ' + Cookies.get('login-info'),
      },
    },
  };
  const [handleStartGame, { loading }] = useStartGameMutation(newCtx);

  const { refetch } = useMeQuery(newCtx);

  const handlePlay = async () => {
    try {
      if (user?.attempts === 0) {
        setIsModalOpen(true);

        return;
      }

      const { data } = await handleStartGame({
        variables: { randomNumber: 0 },
      });

      const { numberGenerated } = data!.startGame;
      setNumber(numberGenerated);

      const { data: meData } = await refetch();

      if (meData) {
        const { me } = meData;
        setUser({
          id: me!.id,
          dob: me!.dob,
          email: me!.email,
          points: me!.points,
          attempts: me!.attempts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.gameWrapper}>
        <div className={classes.glass}>
          <AnimatedNumbers
            animateToNumber={number}
            fontStyle={{
              fontSize: 128,
              fontWeight: 'bold',
              color: '#e75480',
              letterSpacing: 100,
            }}
            configs={(_, index) => {
              return { mass: 1, tension: 230 * (index + 1), friction: 140 };
            }}
          />
          <Button loading={loading} size="large" type="primary" style={{ width: '300px' }} onClick={handlePlay}>
            PLAY
          </Button>

          <Text>You have {user?.attempts} attempt(s) remaining</Text>
        </div>
      </div>

      <Modal
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <h3>You have exhausted all your attempts. Please enter a coupon code to continue.</h3>
        <br />
        <ResetAttempts setIsOpen={setIsModalOpen} />
      </Modal>
    </>
  );
}

interface IProp {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function ResetAttempts({ setIsOpen }: IProp) {
  const [, setUser] = useContext(UserContext)!;
  const [isLoading, setIsLoading] = useState(false);

  const newCtx = {
    context: {
      headers: {
        authorization: 'Bearer ' + Cookies.get('login-info'),
      },
    },
  };

  const [handleRedeem] = useRedeemCouponMutation(newCtx);
  const { refetch } = useQueryQuery(newCtx);
  const { refetch: meRefetch } = useMeQuery(newCtx);

  const onFinish = async (value: any) => {
    try {
      setIsLoading(true);
      await handleRedeem({
        variables: { couponCode: value.code },
      });
      await refetch();
      const { data } = await meRefetch();
      if (data) {
        const { me } = data;
        setUser({
          id: me!.id,
          dob: me!.dob,
          email: me!.email,
          points: me!.points,
          attempts: me!.attempts,
        });
      }
    } catch (_) {
      console.log(_);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} style={{ width: '100%' }}>
      <Form.Item name="code" rules={[{ required: true, message: 'Please input your Coupon code!' }]}>
        <Input placeholder="Coupon code" />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
