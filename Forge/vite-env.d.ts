/// <reference types="vite/client" />

declare global {
    interface ImportMetaEnv {
        readonly VITE_PRIVY_FRONTEND_API_KEY: string
        readonly VITE_KAITO_API_URL: string
        // add any other VITE_ vars here
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}
