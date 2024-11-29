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

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <TimerProvider initialSeconds={14}>
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
