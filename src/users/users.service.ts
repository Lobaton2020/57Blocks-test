import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (await this.emailExist(createUserDto.email)) {
      throw new BadRequestException('The email already exists on the database');
    }
    const { name, lastname, _id, email } = await this.userModel.create(
      createUserDto,
    );
    return { _id, name, lastname, email };
  }

  private async emailExist(email: string) {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  findOne(id) {
    return this.userModel.findOne({ _id: id });
  }
  async findOneByEmail(emailIn) {
    const { _id, name, lastname, email, password } =
      await this.userModel.findOne({
        email: emailIn,
      });
    return [{ _id, name, lastname, email }, { password }];
  }
}
