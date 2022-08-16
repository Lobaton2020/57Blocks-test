import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  NotFoundException,
  Query,
  Put,
  Logger,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import mongoose from 'mongoose';
import { Pagination } from 'src/common/interfaces/pagination.interface';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginate-response';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import {
  ApiQueryLimit,
  ApiQueryPage,
} from 'src/common/decorators/api-query-pagination';

const ValidateMongoIdOrRejected = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Please send a valid Id');
  }
};

@ApiBearerAuth()
@Controller('restaurants')
@UseGuards(JwtAuthGuard)
export class RestaurantsController {
  private logger = new Logger(RestaurantsController.name);
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Req() req, @Body() createRestaurantDto: CreateRestaurantDto) {
    this.logger.log('User is creating a new restaurant record');
    return this.restaurantsService.create(createRestaurantDto, req.user.userId);
  }
  @ApiPaginatedResponse(CreateRestaurantDto)
  @ApiQueryLimit()
  @ApiQueryPage()
  @Get()
  findAll(@Req() req, @Query(PaginationPipe) pagination: Pagination) {
    this.logger.log('User is finding all restaurants');
    return this.restaurantsService.findAll(req.user.userId, pagination);
  }

  @Public()
  @ApiPaginatedResponse(CreateRestaurantDto)
  @ApiQueryLimit()
  @ApiQueryPage()
  @Get('public')
  findAllPublic(
    @Query(PaginationPipe) pagination: Pagination,
  ): Promise<PaginatedDto<CreateRestaurantDto>> {
    this.logger.log('User is finding all public');
    return this.restaurantsService.findAllPublic(pagination);
  }

  @Public()
  @Get('public/:id')
  async findOnePublic(@Req() req, @Param('id') id: string) {
    this.logger.log('User is finding one public restaurant by id');
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
    this.logger.log('User is finding one public restaurant by id');
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
    this.logger.log('User is updating an onwer record');
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
    this.logger.log('User is deleting an onwer record');
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
