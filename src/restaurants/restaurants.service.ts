import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Paginate from 'src/common/helpers/pagination.class';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { UsersService } from 'src/users/users.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
    private readonly userService: UsersService,
  ) {}
  async create(createRestaurantDto: CreateRestaurantDto, userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user)
      throw new BadRequestException(
        'The user that created the record is invalid',
      );
    return this.restaurantModel.create({
      ...createRestaurantDto,
      owner: userId,
    });
  }
  // buildPagination(data){
  //   return {
  //     data,

  //   }
  // }
  async findAll(userId: string, pagination: Pagination) {
    const { page, limit } = pagination;
    const opts = { owner: userId };
    const total = await this.restaurantModel.count(opts);
    const currentPage = (page - 1) * limit;
    const data = await this.restaurantModel.find(opts).skip(page).limit(limit);

    return Paginate.build(data, page, limit, total, currentPage);
  }

  async findAllPublic(pagination: Pagination) {
    const { page, limit } = pagination;
    const opts = { isPublic: true };
    const total = await this.restaurantModel.count(opts);
    const currentPage = (page - 1) * limit;
    const data = await this.restaurantModel
      .find(opts)
      .populate('owner', '-password')
      .skip(page)
      .limit(limit)
      .exec();
    return Paginate.build(data, page, limit, total, currentPage);
  }

  findOnePublic(productId) {
    return this.restaurantModel
      .findOne({
        _id: productId,
        isPublic: true,
      })
      .populate('owner', '-password')
      .exec();
  }
  findOne(productId, userId) {
    return this.restaurantModel.findOne({
      _id: productId,
      owner: userId,
    });
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
    userId: string,
  ) {
    await this.restaurantModel.findOneAndUpdate(
      { _id: id, owner: userId },
      updateRestaurantDto,
    );
    return this.restaurantModel.findOne({ _id: id, owner: userId });
  }

  remove(id: string, userId: string) {
    return this.restaurantModel.findOneAndDelete({ _id: id, owner: userId });
  }
}
