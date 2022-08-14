import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import * as ClassValidator from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const validator = new CreateAuthDto();
      validator.email = email;
      validator.password = password;
      await ClassValidator.validateOrReject(validator);
    } catch (err) {
      const errors = err.map(
        ({ constraints }) => Object.values(constraints)[0],
      );
      new Logger(LocalStrategy.name).debug(JSON.stringify(errors));
      throw new BadRequestException(errors);
    }
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
