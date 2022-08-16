import { Controller, Post, Body, UseGuards, Req, Logger } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name)
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({ type: CreateAuthDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  create(@Req() req) {
    this.logger.log('User doing login');
    return this.authService.login(req.user);
  }
  @Public()
  @Post('signup')
  findAll(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Someone is doing a register');
    return this.userService.create(createUserDto);
  }
}
