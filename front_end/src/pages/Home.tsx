import React from 'react';

import { Button, Typography } from 'antd';

import classes from '../styles/home.module.css';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function Home() {
  return (
    <div className={classes.wrapper}>
      <Title level={1}>
        Welcome to the <p className={classes.title}>Slot Game </p>site. <br /> Please register to play or login to continue.
      </Title>

      <Link to="/game">
        <Button size="large" type="primary">
          Go to game
        </Button>
      </Link>
    </div>
  );
}
