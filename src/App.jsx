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

const queryClient = new QueryClient();

function App() {
    const [telegramUser, setTelegramUser] = useState(null);
    const [showUsername, setShowUsername] = useState(false); // New state to control visibility

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe?.user;
            if (user) {
                setTelegramUser(user);
            } else {
                window.Telegram.WebApp.showAlert('Hello world!');
            }
        }
    }, []);

    const handleShowUsername = () => {
        window.Telegram.WebApp.showAlert('Hello world!');
        setShowUsername(true); // Show username when button is clicked
    };

    console.log(window.Telegram, "_++_+_+_+_")

    return (
        <QueryClientProvider client={queryClient}>
            <TimerProvider initialSeconds={14}>
                <BrowserRouter>
                    <div style={{ padding: '20px' }}>
                        {/* Button to toggle username display */}
                        <button onClick={handleShowUsername}>
                            Show Telegram Username {window.Telegram}
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
