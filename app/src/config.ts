export const env: 'local' | 'development' | 'test' | 'staging' | 'production' =
  process.env.NODE_ENV ?? 'local';
