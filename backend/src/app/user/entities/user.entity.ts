import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Asset } from '../../asset/entities/asset.entity';
import { Role } from 'src/app/auth/entities/roles';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  // Add user properties
  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({default : [Role.User]})
  roles: string[];
}

@ObjectType()
export class LoginUserResponseR {
  @Field(() => User)
  user: User;

  @Field(() => String)
  authToken: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
