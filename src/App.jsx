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
    useEffect(() => {
        // Ensure the Telegram Web Apps object exists
        if (window.Telegram?.WebApp) {
          const user = window.Telegram.WebApp.initDataUnsafe?.user;
    
          if (user) {
            setTelegramUser(user); // Set the user info in state
          } else {
            console.warn("No user data available");
          }
        }
      }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TimerProvider initialSeconds={14}>
            {telegramUser ? (
        <p>
          Welcome, {telegramUser.username || telegramUser.first_name}!
        </p>
      ) : (
        <p>Loading user info...</p>
      )}
                <BrowserRouter>
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
