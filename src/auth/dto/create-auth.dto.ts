import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsPassword } from '../../common/decorators/is-password.decorator';

export class CreateAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPassword()
  password: string;
}
