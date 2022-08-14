import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from 'src/config/app';
import { JwtStrategy } from './strategies/jwt.strategy';

const JwtModuleConfig = JwtModule.registerAsync({
  useFactory: (configService: ConfigType<typeof jwtConfig>) => {
    return {
      secret: configService.secretKey,
      signOptions: { expiresIn: `${configService.expirationTimeSeconds}s` },
    };
  },
  inject: [jwtConfig.KEY],
});
@Module({
  imports: [UsersModule, PassportModule, JwtModuleConfig],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
