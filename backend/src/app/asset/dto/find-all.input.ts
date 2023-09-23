import { Field, ArgsType, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';
import { GetPaginatedArgs } from 'src/app/common/dto/get-paginated.args';
import {  GraphQLJSONObject } from 'graphql-type-json';

@ArgsType()
export class FindAllAssetsArgs extends PartialType(GetPaginatedArgs) {

  @Field(() => GraphQLJSONObject, { nullable: true })
  filters?: object
}
