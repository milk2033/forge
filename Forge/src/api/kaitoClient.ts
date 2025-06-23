// src/api/kaitoClient.ts
import axios, { type AxiosInstance } from 'axios';
import type { YapsResponse } from '../types/yaps';

// Use the proxied endpoint
export const BASE_URL = '/api/api/v1';

export class KaitoClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({ baseURL: BASE_URL });
    }

    async getYapsScore(userHandle: string): Promise<YapsResponse> {
        try {
            const response = await this.client.get<YapsResponse>('/yaps', {
                params: { username: userHandle }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const kaitoClient = new KaitoClient();
