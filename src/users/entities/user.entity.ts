import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import EncryptPassword from 'src/common/encript-password';

export type UserDocument = User & Document;

const commonConfig = { required: true };

@Schema()
export class User {
  @Prop({ ...commonConfig })
  name: string;

  @Prop({ ...commonConfig })
  lastname: string;

  @Prop({ ...commonConfig, index: { unique: true } })
  email: string;

  @Prop({ ...commonConfig })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// eslint-disable-next-line @typescript-eslint/ban-types
UserSchema.pre('save', async function (next: Function) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await EncryptPassword.encrypt(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});
