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
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const handleUserCheck = async () => {
            if (window.Telegram?.WebApp) {
                const user = window.Telegram.WebApp.initDataUnsafe?.user;
                console.log('User Checking...')
                if (user) {
                    try {
                        // Check if user exists in the database
                        const response = await axiosInstance.post('/user/info', {
                            telegram_id: user.id//6430530130,
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
                                    telegram_id: user.id,
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
                    window.alert('No user data available');
                }
                ;
            }
        };
        handleUserCheck();
    }, []);

    
    // const { data: userInfo, refetch } = useUserInfo(window.Telegram.WebApp.initDataUnsafe?.user?.id);

    return (
           <></>
    );
}

export default App;
