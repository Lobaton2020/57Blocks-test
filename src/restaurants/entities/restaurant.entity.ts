import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Menu } from '../dto/create-restaurant.dto';
export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isPublic: boolean;

  @Prop({ type: Array })
  photos: string[];

  @Prop()
  webpage: string;

  @Prop({ required: true, default: 0 })
  rating: number;

  @Prop([
    raw({
      name: { type: String },
      price: { type: Number },
    }),
  ])
  menus: Menu[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
