// src/hooks/useYapsScore.ts

import { useState, useEffect } from 'react';
import { kaitoClient } from '../api/kaitoClient';
import type { YapsResponse } from '../types/yaps';

export interface UseYapsScoreResult {
    data: YapsResponse | null;
    isLoading: boolean;
    error: Error | null;
    refetch: (handle?: string) => Promise<void>;
}

/**
 * React hook to fetch a user's Yaps score.
 * @param initialHandle - the Kaito username or address to fetch
 */
export function useYapsScore(initialHandle: string): UseYapsScoreResult {
    const [handle, setHandle] = useState(initialHandle);
    const [data, setData] = useState<YapsResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchScore = async (h: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await kaitoClient.getYapsScore(h);
            setData(result);
        } catch (err: any) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setData(null);
        } finally {
            setIsLoading(false);
        }
    };

    // initial fetch and refetch when handle changes
    useEffect(() => {
        if (handle) {
            fetchScore(handle);
        } else {
            setData(null);
        }
    }, [handle]);

    return {
        data,
        isLoading,
        error,
        refetch: (newHandle = handle) => {
            if (newHandle && newHandle !== handle) {
                setHandle(newHandle);
            }
            return fetchScore(newHandle);
        },
    };
}
