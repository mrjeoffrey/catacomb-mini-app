/**
 * External dependencies.
 */
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { TimerProvider } from '@/contexts/timer-context'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient();

function App() {
    const [telegramUser, setTelegramUser] = useState(null);
    const [showUsername, setShowUsername] = useState(false); // New state to control visibility

    useEffect(() => {
        const handleUserCheck = async () => {
            if (window.Telegram?.WebApp) {
                const user = window.Telegram.WebApp.initDataUnsafe?.user;
                console.log('User Checking...')
                if (user) {
                    try {
                        // Check if user exists in the database
                        const response = await axiosInstance.post('/user/info', {
                            telegram_id: user.id,
                        });

                        // If user exists, log their info
                        if (response.data) {
                            console.log('Existing user:', response.data);
                            setTelegramUser(response.data);
                        }
                    } catch (error) {
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
                                setTelegramUser(newUserResponse.data.user);
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
            }
        };

        handleUserCheck();
    }, []);

    const handleShowUsername = () => {
        setShowUsername(true); // Show username when button is clicked
    };

    return (
        <QueryClientProvider client={queryClient}>
            <TimerProvider initialSeconds={14}>
                <BrowserRouter>
                    <div style={{ padding: '20px' }}>
                        {/* Button to toggle username display */}
                        <button onClick={handleShowUsername}>
                            Show Telegram Username
                        </button>

                        {/* Conditionally display username */}
                        {showUsername && (
                            <p>
                                Welcome, {telegramUser.username || telegramUser.first_name}!
                            </p>
                        )}
                    </div>
                    <Routes>
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
                        <Route path="/quests" element={<Layout><Quests /></Layout>} />
                        <Route path="/my-tribe" element={<Layout><MyTribe /></Layout>} />
                    </Routes>
                </BrowserRouter>
            </TimerProvider>
        </QueryClientProvider>
    );
}

export default App;
