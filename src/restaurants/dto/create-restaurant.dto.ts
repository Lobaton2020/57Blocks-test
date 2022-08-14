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
import { IsArrayUrl } from 'src/common/decorators/is-array-url.decorator';

export class Menu {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNumber()
  price: number;
}

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  isPublic: boolean;

  @IsArrayUrl('photos')
  photos: string[];

  @IsUrl()
  webpage: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ValidateNested({ each: true })
  @Type(() => Menu)
  menus: string[];
}
