import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import EncryptPassword from '../common/helpers/encript-password';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const [user, { password: pass }] = await this.userService.findOneByEmail(
      email,
    );
    if (user && (await EncryptPassword.verify(password, pass))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      username: user.name,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
