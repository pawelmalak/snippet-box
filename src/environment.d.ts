declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: string;
    }
  }
}

export {};
