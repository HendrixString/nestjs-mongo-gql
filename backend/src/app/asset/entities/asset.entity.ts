import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
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
  image: string;

  @Field(() => String)
  @Prop({ unique: true })
  isbn: string;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  @Prop({default: []})
  tags?: string[];

  @Prop()
  @Field(() => Date, { description: 'Created At', defaultValue: 0 })
  createdAt?: Date

  @Prop()
  @Field(() => Date, { description: 'Updated At', defaultValue: 0 })
  updatedAt?: Date
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
