/**
 * External dependencies.
 */
import { useQuery } from '@tanstack/react-query';

const ALLIES_URL = '/data/allies.json'; 
const fetchAllies = async () => {
    const response = await fetch(ALLIES_URL);
    return response.json();
};

const useAllies = () => {
    return useQuery({
        queryKey: ['allies'],
        queryFn: fetchAllies,
    });
};

export default useAllies;