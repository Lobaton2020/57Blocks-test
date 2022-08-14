import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import enviroments from './config/enviroments';
import app, { jwtConfig, mongoConfig } from './config/app';
import validation from './config/validation';
import { MONGO_DB } from './config/constants';

const ConfigModuleProvider = ConfigModule.forRoot({
  envFilePath: enviroments[process.env.NODE_ENV] || '.env',
  isGlobal: true,
  load: [app, jwtConfig, mongoConfig],
  validationSchema: validation,
});

const MongooseConfig = MongooseModule.forRootAsync({
  imports: [],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return configService.get(MONGO_DB);
  },
});

@Module({
  imports: [
    MongooseConfig,
    ConfigModuleProvider,
    RestaurantsModule,
    UsersModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
