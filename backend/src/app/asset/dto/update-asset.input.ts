import { CreateAssetInput } from './create-asset.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateAssetInput extends PartialType(CreateAssetInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongooSchema.Types.ObjectId;
}
