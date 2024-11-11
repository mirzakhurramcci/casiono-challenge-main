import { useContext, useState } from 'react';

import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Switch, theme, Popconfirm, Typography, Space, Button, Modal } from 'antd';

import classes from './navbar.module.css';

import Spinner from '../Spin';
import { UserContext } from '../../context/user';
import { randStr } from '../../lib/randomString';
import { useCreateCouponMutation, useMeQuery, useQueryQuery } from '../../lib/apolloHooks';

const { Title } = Typography;

interface IProps {
  clicked: boolean;
  handleClick: () => void;
}

export default function Navbar({ clicked, handleClick }: IProps) {
  const [user, setUser] = useContext(UserContext)!;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const newCtx = {
    context: {
      headers: {
        authorization: 'Bearer ' + Cookies.get('login-info'),
      },
    },
  };
  const { refetch } = useMeQuery(newCtx);

  const { refetch: couponRefetch } = useQueryQuery(newCtx);
  const [handleRedeem, { loading }] = useCreateCouponMutation(newCtx);
  const randomString = randStr(5);

  const handleOk = async () => {
    try {
      await handleRedeem({
        variables: {
          coupon: { code: randomString },
        },
      });

      setIsModalOpen(false);

      const { data: meData } = await refetch();
      await couponRefetch();

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
    } catch (_) {}
  };

  const {
    token: { colorWhite },
  } = theme.useToken();

  const navigate = useNavigate();

  const onChange = (checked: boolean) => {
    handleClick();
  };

  const onConfirm = () => {
    Cookies.remove('login-info');
    navigate('/auth/login');
  };

  return (
    <>
      <div className={classes.navbarWrapper} style={{ backgroundColor: colorWhite }}>
        <div className={classes.menuWrapper}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className={classes.logo}>
              <img src={`/logo.png`} width="20px" alt="Logo" />{' '}
              <Title style={{ margin: 0 }} level={3}>
                CASINO
              </Title>
            </div>
          </Link>
          {user && (
            <Button loading={false} onClick={() => setIsModalOpen2(true)}>
              My Coupons
            </Button>
          )}
        </div>

        <div className={classes.menuWrapper}>
          {!user && (
            <Space wrap>
              <Link to="/auth/login">
                <Button type="primary">Log In</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Register</Button>
              </Link>
            </Space>
          )}

          {user && (
            <p className={classes.prize}>
              Your Account has <span>{user.points}</span> prize points
            </p>
          )}

          {user && user.points > 999 && (
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Redeem
            </Button>
          )}

          {user && (
            <Popconfirm onConfirm={onConfirm} className={classes.user} okText="Yes" cancelText="No" title={'Are you sure you want to logout?'}>
              <div className={classes.account}> {user.email[0].toUpperCase()}</div>
            </Popconfirm>
          )}
          <Switch checkedChildren="Dark" unCheckedChildren="Light" checked={clicked} onChange={onChange} />
        </div>
      </div>
      <Modal confirmLoading={loading} centered open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <h3>Congratulation. Here is your voucher</h3>
        <div className={classes.wrap}>
          <div className={classes.coupon}>
            <div className={classes.couponLeft}></div>
            <div className={classes.couponRight}>
              <p className={classes.code}>{randomString}</p>
            </div>
          </div>
        </div>
      </Modal>
      <Modal centered open={isModalOpen2} onOk={() => setIsModalOpen2(false)} onCancel={() => setIsModalOpen2(false)}>
        <h3>Here are your coupons</h3>

        <CouponDisplay />
      </Modal>
    </>
  );
}

interface IProp {
  code: string;
}

function copy(code: string) {
  navigator.clipboard.writeText(code);
}

function Coupon({ code }: IProp) {
  return (
    <div className={classes.wrap}>
      <div className={classes.coupon}>
        <div className={classes.couponLeft}></div>
        <div className={classes.couponRight}>
          <Title style={{ color: 'black' }} className={classes.code} copyable>
            {code}
          </Title>
        </div>
      </div>

      <hr />
    </div>
  );
}

function CouponDisplay() {
  const newCtx = {
    context: {
      headers: {
        authorization: 'Bearer ' + Cookies.get('login-info'),
      },
    },
  };
  const { data, loading, error } = useQueryQuery(newCtx);

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  const { getCoupons } = data!;

  return <>{getCoupons.length === 0 ? <p>No coupons available</p> : getCoupons.map((c, i) => <Coupon code={c.code} key={i} />)}</>;
}
