import { registerAs, ConfigService } from '@nestjs/config';
import { APP_CONFIG, JWT_CONFIG, MONGO_DB } from './constants';

interface IEnvAppConfig {
  httpPort: number;
  randomNumApi: string
}

export interface IJwtConfig {
  secretKey: string;
  expirationTimeSeconds: string;
}
export type IAppConfig = IEnvAppConfig & ConfigService;

export default registerAs(APP_CONFIG, () => ({
  httpPort: process.env.HTTP_PORT || 3000,
  randomNumApi: process.env.RANDOM_URL_API,
}));

export const defaultPagination = {
  limit: 1000,
  skip: 0,
};

export const jwtConfig = registerAs(
  JWT_CONFIG,
  (): IJwtConfig => ({
    secretKey: process.env.JWT_SECRET_KEY,
    expirationTimeSeconds: process.env.JWT_TIME_EXPIRES_SECONDS,
  }),
);

export const mongoConfig = registerAs(MONGO_DB, () => ({
  uri: process.env.MONGODB_URI,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_NAME,
  retryAttempts: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}));
