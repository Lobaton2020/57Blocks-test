import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/common/decorators/is-password.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsPassword()
  password: string;
}
