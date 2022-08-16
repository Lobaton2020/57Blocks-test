import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsArrayUrl } from '../../common/decorators/is-array-url.decorator';

export class Menu {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class CreateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty()
  @IsArrayUrl('photos')
  photos: string[];

  @ApiProperty()
  @IsUrl()
  webpage: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Menu)
  menus: Menu[];
}
