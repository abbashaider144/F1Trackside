import type { NextConfig } from "next";

const config: NextConfig = {
    output: "export",
    env: {
        PLAYERS_API_URL:
        process.env.NODE_ENV === "development" 
            ? "https://localhost:5001"
            : "https://template-api.fly.dev/",
    },
    images: {
        unoptimized: true,
    },
}

export default config;
