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

const sendLog = async (message) => {
  try {
    await axiosInstance.post('/logs', 
     JSON.stringify({ message, timestamp: new Date().toISOString() }),
    );
  } catch (err) {
    console.error('Failed to send log:', err);
  }
};

const getLocationForIP = async (ip) => {
  if (!ip) throw new Error('IP address is required');
  const response = await fetch(
    `${import.meta.env.VITE_IP_INFO_URL}${ip}?token=${import.meta.env.VITE_IP_INFO_TOKEN}`
  );
  const data = await response.json();
  sendLog(`Fetched location data: ${JSON.stringify(data)}`);
  return data;
};

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_CHECK_IP_URL);
        sendLog(`CHECKIP response: ${JSON.stringify(response)}`);
        const ip = await response.text();
        sendLog(`Fetched IP Address: ${ip}`);
        return ip.trim();
      } catch (error) {
        sendLog(`Failed to fetch IP: ${error.message}`);
        return null;
      }
    };

    const handleUserCheck = async () => {
      sendLog('Checking if Telegram WebApp is available...');
      if (window.Telegram?.WebApp) {
        sendLog(`Telegram WebApp available: ${JSON.stringify(window.Telegram.WebApp)}`);
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        sendLog(`Telegram User: ${JSON.stringify(user)}`);
        if (user) {
          try {
            sendLog(`Checking user info for Telegram ID: ${user.id}`);
            const response = await axiosInstance.post('/user/info', {
              telegram_id:user.id,
            });
            if (response.data) {
              setLoading(false);
              sendLog(`Existing user: ${JSON.stringify(response.data)}`);
            }
          } catch (error) {
            sendLog(`Error fetching user info: ${error.message}`);
            if (error.response?.status === 404) {
              sendLog('User not found, proceeding to create a new user.');
              try {
                const ipAddress = await fetchIPAddress();
                sendLog(`IP Address for new user: ${ipAddress}`);
                const locationData = await getLocationForIP(ipAddress);
                sendLog(`Location data: ${JSON.stringify(locationData)}`);
                const locationString = locationData?.country
                  ? `(${locationData.country}: ${locationData.region}: ${locationData.city})`
                  : '(Location unavailable)';
                sendLog(`Formatted location: ${locationString}`);
                const newUserResponse = await axiosInstance.post('/user', {
                  telegram_id: user.id,
                  username: user.username || user.first_name,
                  wallet_address: null,
                  IP_address: ipAddress || 'Unknown IP',
                  referral_code: window.Telegram.WebApp.initDataUnsafe?.start_param || null,
                  location: locationString,
                });
                sendLog(`New user created: ${JSON.stringify(newUserResponse.data.user)}`);
                setLoading(false);
              } catch (creationError) {
                sendLog(`Error creating new user: ${creationError.message}`);
              }
            }
          }
        }
      }
    };

    sendLog('App initialized, starting user check.');
    handleUserCheck();
  }, []);
  sendLog(`-------starting-----${window.Telegram.WebApp.initDataUnsafe?.user?.id}`);
  const { data: userInfo, refetch } = useUserInfo(window.Telegram.WebApp.initDataUnsafe?.user?.id
  );

  useEffect(() => {
    sendLog(`Fetched userInfo from useUserInfo: ${JSON.stringify(userInfo)}`);
  }, [userInfo]);
  
  // return userInfo ? (
  //   <TimerProvider
  //     initialSeconds={userInfo?.seconds}
  //     time_remaining={userInfo?.remainingSeconds}
  //     gold={userInfo?.gold}
  //   >
  //     <BrowserRouter>
  //       {loading ? (
  //         <>
  //           {sendLog('Loading panel is active.')}
  //           <LoadingPanel />
  //         </>
  //       ) : (
  //         <Layout userInfo={userInfo}>
  //           <Routes>
  //             <Route path="/" element={<Home refetch={refetch} />} />
  //             <Route path="/leaderboard" element={<Leaderboard />} />
  //             <Route
  //               path="/quests"
  //               element={<Quests userInfo={userInfo} refetch={refetch} />}
  //             />
  //             <Route path="/my-tribe" element={<MyTribe userInfo={userInfo} />} />
  //           </Routes>
  //         </Layout>
  //       )}
  //     </BrowserRouter>
  //   </TimerProvider>
  // ) : (
  //   <>
  //     {/* {sendLog('User info not available, showing LoadingPanel.')} */}
  //     <LoadingPanel />
  //   </>
  // );
}

export default App;
