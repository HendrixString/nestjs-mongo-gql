import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Schema()
export class Asset {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => User, { nullable: true })
  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'User'})
  owner: User;

  // Add user properties
  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description: string;

  @Field(() => Float)
  @Prop()
  price: number;

  @Field(() => String, { nullable: true })
  @Prop()
  coverImage: string;

  @Field(() => String)
  @Prop({ unique: true })
  isbn: string;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  @Prop({default: []})
  tags?: string[];

  // @Field(() => Author)
  // @Prop({ type: MongooSchema.Types.ObjectId, ref: 'Author' })
  // author: Author;


  // @Field(() => [User])
  // @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'User' }] })
  // readers: User[];
}

@ObjectType()
export class GetAssetsPaginatedResponse {
  @Field(() => [Asset], { nullable: false, defaultValue: [] })
  assets: Asset[];

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  count: number;
}

export type AssetDocument = Asset & Document;
export const AssetSchema = SchemaFactory.createForClass(Asset);
