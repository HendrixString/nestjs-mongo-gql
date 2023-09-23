import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@ArgsType()
export class GetPaginatedArgs {
  @Field(() => Int, { defaultValue: 10, nullable: true })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  @IsOptional()
  @IsNumber()
  skip?: number;
}
