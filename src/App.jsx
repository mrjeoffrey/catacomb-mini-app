/**
 * External dependencies.
 */
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { TimerProvider } from '@/contexts/timer-context';


/**
 * Internal dependencies.
 */
import Home from '@/pages/home';
import Leaderboard from '@/pages/leaderboard';
import Quests from '@/pages/quests';
import MyTribe from '@/pages/my-tribe';
import Layout from '@/components/layout/layout';
import { useEffect, useState } from 'react';
import axiosInstance from './api/axiosInstance';
import { useUserInfo } from './queries/useUserInfo';
import { LoadingPanel } from '@/components/loading/loading';
import { useSendIPToTelegram } from './queries/useSendIPToTelegram';



function App() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchIPAddress = async () => {
            try {
              const response = await fetch('https://checkip.amazonaws.com/');
              const ip = await response.text();
              return ip.trim();
            } catch (error) {
              console.error('Failed to fetch IP:', error);
              return null; // Fallback for failure
            }
          };
          
          const handleUserCheck = async () => {
            if (window.Telegram?.WebApp) {
              const user = window.Telegram.WebApp.initDataUnsafe?.user;
              if (user) {
                try {
                  // Check if user exists in the database
                  const response = await axiosInstance.post('/user/info', {
                    telegram_id: user.id,
                  });
          
                  if (response.data) {
                    setLoading(false);
                    console.log('Existing user:', response.data);
                  }
                } catch (error) {
                  if (error.response?.status === 404) {
                    // If user not found, fetch IP and create user
                    try {
                      const ipAddress = await fetchIPAddress();
                      const newUserResponse = await axiosInstance.post('/user', {
                        telegram_id: user.id,
                        username: user.username || user.first_name,
                        wallet_address: null, // Optional logic for wallet address
                        IP_address: ipAddress || 'Unknown IP', // Use fetched IP or fallback
                        referral_code: window.Telegram.WebApp.initDataUnsafe?.start_param || null,
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

    
    const { data: userInfo, refetch } = useUserInfo(window.Telegram.WebApp.initDataUnsafe?.user?.id)//6430530130)//);
    // useSendIPToTelegram();
    console.log(useSendIPToTelegram(), "_++_++_+")
    return (
            userInfo?
            <TimerProvider initialSeconds={userInfo?.seconds} time_remaining={userInfo?.remainingSeconds} gold={userInfo?.gold}>
                <BrowserRouter>
                    {loading?<LoadingPanel/>:
                    <Layout userInfo={userInfo}>
                    <Routes>
                        <Route path="/" element={<Home refetch={refetch}/>} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/quests" element={<Quests />} />
                        <Route path="/my-tribe" element={<MyTribe userInfo={userInfo} />} />
                    </Routes>
                    </Layout>
}
                </BrowserRouter>
            </TimerProvider>:<LoadingPanel/>
    );
}

export default App;
