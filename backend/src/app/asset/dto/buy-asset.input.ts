import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class BuyAssetInput {
  @Field(() => String)
  @IsMongoId()
  assetId: MongooSchema.Types.ObjectId;
}
