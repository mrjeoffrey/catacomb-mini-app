/**
 * External dependencies.
 */
import { useQuery } from '@tanstack/react-query';

const PLAYERS_URL = '/data/players.json'; 
const fetchPlayers = async () => {
    const response = await fetch(PLAYERS_URL);
    return response.json();
};

const usePlayers = () => {
    return useQuery({
        queryKey: ['players'],
        queryFn: fetchPlayers,
    });
};

export default usePlayers;