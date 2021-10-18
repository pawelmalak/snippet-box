declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: string;
      JWT_SECRET: string;
    }
  }
}

export {};
