// src/scripts/testKaito.ts
import 'dotenv/config';                // loads process.env.VITE_KAITO_API_URL
import { BASE_URL, kaitoClient } from '../api/kaitoClient.ts';

async function main() {
    const handle = process.argv[2] || 'alice';
    console.log('BASE_URL →', BASE_URL);
    console.log(`Fetching Yaps for “${handle}”…`);

    try {
        const resp = await kaitoClient.getYapsScore(handle);
        console.log('Result:', JSON.stringify(resp, null, 2));
    } catch (err: any) {
        console.error('Error fetching Yaps:', err.message || err);
        process.exit(1);
    }
}

main();
