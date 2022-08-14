import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  NotFoundException,
  Query,
  Put,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import mongoose from 'mongoose';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';

const ValidateMongoIdOrRejected = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Please send a valid Id');
  }
};

@Controller('restaurants')
@UseGuards(JwtAuthGuard)
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Req() req, @Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto, req.user.userId);
  }
  @Get()
  findAll(@Req() req, @Query(PaginationPipe) pagination: Pagination) {
    return this.restaurantsService.findAll(req.user.userId, pagination);
  }

  @Public()
  @Get('public')
  findAllPublic(@Query(PaginationPipe) pagination: Pagination) {
    return this.restaurantsService.findAllPublic(pagination);
  }

  @Public()
  @Get('public/:id')
  async findOnePublic(@Req() req, @Param('id') id: string) {
    ValidateMongoIdOrRejected(id);
    const restaurant = await this.restaurantsService.findOnePublic(id);
    if (!restaurant) {
      throw new NotFoundException();
    }
    return restaurant;
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    ValidateMongoIdOrRejected(id);
    const restaurant = await this.restaurantsService.findOne(
      id,
      req.user.userId,
    );
    if (!restaurant) {
      throw new NotFoundException();
    }
    return restaurant;
  }

  @Put(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    ValidateMongoIdOrRejected(id);
    const restaurant = this.restaurantsService.update(
      id,
      updateRestaurantDto,
      req.user.userId,
    );
    if (!restaurant) {
      throw new NotFoundException();
    }
    return restaurant;
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    ValidateMongoIdOrRejected(id);
    const restaurant = await this.restaurantsService.remove(
      id,
      req.user.userId,
    );
    if (!restaurant) {
      throw new NotFoundException();
    }
    return restaurant;
  }
}
