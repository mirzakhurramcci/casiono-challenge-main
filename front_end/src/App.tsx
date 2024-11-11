import { useContext, useEffect, useState, ReactNode } from 'react';

import Cookies from 'js-cookie';
import { ConfigProvider, Layout, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import Spinner from './components/Spin';
import Navbar from './components/navbar/Navbar';

import { IUser, UserContext } from './context/user';
import { useMeQuery } from './lib/apolloHooks';

function App() {
  const userState = useState<IUser | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const { defaultAlgorithm, darkAlgorithm } = theme;

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#E75480',
          colorWhite: isDarkMode ? '#141414' : '#fff',
        },
      }}
    >
      <UserContext.Provider value={userState}>
        <AppWrapper>
          <Navbar clicked={isDarkMode} handleClick={handleClick} />
          <Layout style={{ height: 'calc(100vh - 50px)' }}>
            <Outlet />
          </Layout>
        </AppWrapper>
      </UserContext.Provider>
    </ConfigProvider>
  );
}

export default App;

interface IProps {
  children: ReactNode;
}

function AppWrapper({ children }: IProps) {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext)!;

  const { loading, error, data } = useMeQuery({
    context: {
      headers: {
        authorization: 'Bearer ' + Cookies.get('login-info'),
      },
    },
  });

  useEffect(() => {
    if (!Cookies.get('login-info')) return navigate('/auth/login');

    if (data) {
      const { me } = data;
      setUser({
        id: me!.id,
        dob: me!.dob,
        email: me!.email,
        points: me!.points,
        attempts: me!.attempts,
      });

      return;
    }
    if (error) {
      Cookies.remove('login-info');
      return navigate('/auth/login');
    }
  }, [data, setUser, navigate, error]);

  if (loading || !user) return <Spinner />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return <div>{children}</div>;
}
