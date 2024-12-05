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



function App() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const handleUserCheck = async () => {
            if (window.Telegram?.WebApp) {
                const user = window.Telegram.WebApp.initDataUnsafe?.user;
                if (user) {
                    try {
                        // Check if user exists in the database
                        const response = await axiosInstance.post('/user/info', {
                            telegram_id: 6430530130//user.id//6430530130,
                        });
                        console.log(response, "response")
                        
                        // If user exists, log their info
                        if (response.data) {
                            setLoading(false)
                            console.log('Existing user:', response.data);
                        }
                    } catch (error) {
                        console.log(error, "error.response")
                        // If user doesn't exist, create a new user
                        if (error.response?.status === 404) {
                            try {
                                const newUserResponse = await axiosInstance.post('/user', {
                                    telegram_id: 6430530130,//user.id,
                                    username: user.username || user.first_name,
                                    wallet_address: null, // Add logic for wallet address if available
                                    IP_address: window.location.hostname, // Example IP address logic
                                });

                                console.log('New user created:', newUserResponse.data.user);
                                setLoading(false)

                            } catch (creationError) {
                                console.error('Error creating new user:', creationError);
                            }
                        } else {
                            console.error('Error fetching user info:', error);
                        }
                    }
                } else {
                    // window.alert('No user data available');
                }
                ;
            }
        };
        handleUserCheck();
    }, []);

    
    const { data: userInfo, refetch } = useUserInfo(6430530130)//window.Telegram.WebApp.initDataUnsafe?.user?.id);
    console.log(window.Telegram.WebApp, "window.Telegram.WebApp.initDataUnsafe")
    return (
            userInfo?
            <TimerProvider initialSeconds={userInfo?.seconds} time_remaining={userInfo?.remainingSeconds}>
                <BrowserRouter>
                    {loading?<LoadingPanel/>:
                    <Layout userInfo={userInfo}>
                    <Routes>
                        <Route path="/" element={<Home refetch={refetch}/>} />
                        {/* <Route path="/referred_by/:referred_by" element={<Home refetch={refetch}/>} /> */}
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/quests" element={<Quests />} />
                        <Route path="/my-tribe" element={<MyTribe />} />
                    </Routes>
                    </Layout>
}
                </BrowserRouter>
            </TimerProvider>:<LoadingPanel/>
    );
}

export default App;
