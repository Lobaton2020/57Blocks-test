import { IsEmail } from 'class-validator';
import { IsPassword } from 'src/common/decorators/is-password.decorator';

export class CreateAuthDto {
  @IsEmail()
  email: string;
  @IsPassword()
  password: string;
}
