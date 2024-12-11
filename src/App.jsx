/**
 * External dependencies.
 */
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


const getLocationForIP = async (ip) => {
  if (!ip) throw new Error("IP address is required");
  const response = await fetch(
    `${import.meta.env.VITE_IP_INFO_URL}${ip}?token=${import.meta.env.VITE_IP_INFO_TOKEN}`
  );
  const data = await response.json();
  return data;
};

function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_CHECK_IP_URL);

        console.log(response, "CHECKIP response")
        const ip = await response.text();
        return ip.trim();
      } catch (error) {
        console.error('Failed to fetch IP:', error);
        return null;
      }
    };

    const handleUserCheck = async () => {
      if (window.Telegram?.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (user) {
          try {

            const response = await axiosInstance.post('/user/info', {
              telegram_id:  import.meta.env.VITE_TEST_MODE ? import.meta.env.VITE_TEST_TELEGRAM_USER_ID : user.id,
            });

            if (response.data) {
              setLoading(false);
              console.log('Existing user:', response.data);
            }
          } catch (error) {
            if (error.response?.status === 404) {

              try {
                const ipAddress = await fetchIPAddress();
                const locationData = await getLocationForIP(ipAddress);
                const locationString = locationData?.country
                  ? `(${locationData.country}: ${locationData.region}: ${locationData.city})`
                  : "(Location unavailable)";
                const newUserResponse = await axiosInstance.post('/user', {
                  telegram_id: import.meta.env.VITE_TEST_MODE ? import.meta.env.VITE_TEST_TELEGRAM_USER_ID : user.id,
                  username: user.username || user.first_name,
                  wallet_address: null,
                  IP_address: ipAddress || 'Unknown IP',
                  referral_code: window.Telegram.WebApp.initDataUnsafe?.start_param || null,
                  location: locationString
                });

                console.log('New user created:', newUserResponse.data.user);
                setLoading(false);
              } catch (creationError) {
                console.error('Error creating new user:', creationError);
              }
            } else {
              console.error('Error fetching user info:', error);
            }
          }
        }
      }
    };
    handleUserCheck();
  }, []);


  const { data: userInfo, refetch } = useUserInfo(
    import.meta.env.VITE_TEST_MODE ? import.meta.env.VITE_TEST_TELEGRAM_USER_ID :
      window.Telegram.WebApp.initDataUnsafe?.user?.id)

  return (
    userInfo ?
      <TimerProvider initialSeconds={userInfo?.seconds} time_remaining={userInfo?.remainingSeconds} gold={userInfo?.gold}>
        <BrowserRouter>
          {loading ? <LoadingPanel /> :
            <Layout userInfo={userInfo}>
              <Routes>
                <Route path="/" element={<Home refetch={refetch} />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/quests" element={<Quests userInfo={userInfo} />} />
                <Route path="/my-tribe" element={<MyTribe userInfo={userInfo} />} />
              </Routes>
            </Layout>
          }
        </BrowserRouter>
      </TimerProvider> : <LoadingPanel />
  );
}

export default App;
