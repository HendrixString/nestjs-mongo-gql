import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class CreateAssetInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  title: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  @MinLength(10)
  description: string;

  @Field(() => Float)
  @IsNumber({
    maxDecimalPlaces: 3,
    allowNaN: false,
  })
  price: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  image: string;

  @Field(() => String)
  @IsString()
  isbn: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsMongoId()
  owner: MongooSchema.Types.ObjectId;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags: string[];

}
