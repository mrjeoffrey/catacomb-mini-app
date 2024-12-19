import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import Home from '@/pages/home';
import Leaderboard from '@/pages/leaderboard';
import Quests from '@/pages/quests';
import MyTribe from '@/pages/my-tribe';
import { TimerProvider } from '@/contexts/timer-context';
import Layout from '@/components/layout/layout';
import axiosInstance from './api/axiosInstance';
import { useUserInfo } from './queries/useUserInfo';
import { LoadingPanel } from '@/components/loading/loading';
import { useGetTasks } from './queries/useTasks';
import SplashPage from './pages/splash';

const getLocationForIP = async (ip) => {
  if (!ip) throw new Error('IP address is required');
  const response = await fetch(
    `${import.meta.env.VITE_IP_INFO_URL}${ip}?token=${import.meta.env.VITE_IP_INFO_TOKEN}`
  );
  const data = await response.json();
  return data;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // State to manage splash visibility

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_CHECK_IP_URL);
        const ip = await response.text();
        return ip.trim();
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    const handleUserCheck = async () => {
      if (window.Telegram?.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;

        if (user) {
          try {
            const response = await axiosInstance.post('/user/info', {
              telegram_id: user.id,
            });
            if (response.data) {
              setLoading(false);
            }
          } catch (error) {
            if (error.response?.status === 404) {
              try {
                const ipAddress = await fetchIPAddress();
                const locationData = await getLocationForIP(ipAddress);

                const locationString = locationData?.country
                  ? `(${locationData.country}: ${locationData.region}: ${locationData.city})`
                  : '(Location unavailable)';

                await axiosInstance.post('/user', {
                  telegram_id: user.id,
                  username: user.username || user.first_name,
                  wallet_address: null,
                  IP_address: ipAddress || 'Unknown IP',
                  referral_code: window.Telegram.WebApp.initDataUnsafe?.start_param || null,
                  location: locationString,
                });

                setLoading(false);
              } catch (creationError) {
                console.log(creationError);
              }
            }
          }
        }
      }
    };

    handleUserCheck();
  }, []);

  const { data: userInfo, refetch } = useUserInfo(
    window.Telegram.WebApp.initDataUnsafe?.user?.id
  );
  const { data: tasks, isLoading } = useGetTasks();

  const handleStartApp = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashPage onStart={handleStartApp} />;
  }

  return userInfo ? (
    <TimerProvider
      initialSeconds={userInfo?.seconds}
      time_remaining={userInfo?.remainingSeconds}
      gold={userInfo?.gold}
    >
      <BrowserRouter>
        {loading ? (
          <LoadingPanel />
        ) : (
          <Layout userInfo={userInfo} tasks={tasks}>
            <Routes>
              <Route path="/" element={<Home refetch={refetch} />} />
              <Route path="/leaderboard" element={<Leaderboard userInfo={userInfo} />} />
              <Route
                path="/quests"
                element={
                  <Quests
                    userInfo={userInfo}
                    refetch={refetch}
                    tasks={tasks}
                    isLoading={isLoading}
                  />
                }
              />
              <Route path="/my-tribe" element={<MyTribe userInfo={userInfo} />} />
            </Routes>
          </Layout>
        )}
      </BrowserRouter>
    </TimerProvider>
  ) : (
    <LoadingPanel />
  );
}

export default App;
