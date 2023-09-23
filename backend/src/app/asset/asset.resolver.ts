import { Resolver, Query, Mutation, Args, ID, Context, GqlExecutionContext } from '@nestjs/graphql';
import { AssetService } from './asset.service';
import { Asset, GetAssetsPaginatedResponse } from './entities/asset.entity';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { GetPaginatedArgs } from '../common/dto/get-paginated.args';
import { GetPaginatedSubDocumentsArgs } from '../common/dto/get-paginated-sub-document.args';
import { Schema as MongooSchema, ObjectId } from 'mongoose';
import { ExecutionContext, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { BuyAssetInput } from './dto/buy-asset.input';
import { log } from 'console';
import { RolesGuard } from '../auth/roles.guard';
import { Role, Roles } from '../auth/entities/roles';
import { FindAllAssetsArgs } from './dto/find-all.input';

@Resolver(() => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => GetAssetsPaginatedResponse, { name: 'assets' })
  findAll(@Args() input: FindAllAssetsArgs) {
    return this.assetService.findAll(input.limit, input.skip, input?.filters);
  }

  @Query(() => Asset, { name: 'asset' })
  findOne(@Args('input', { type: () => ID}) input: ObjectId) {
    return this.assetService.byId(input);
  }

  @Mutation(() => Asset)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  createAsset(@Args('input') input: CreateAssetInput) {
    return this.assetService.create(input);
  }

  @Mutation(() => Asset)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateAsset(@Args('input') input: UpdateAssetInput) {
    return this.assetService.update(input._id, input);
  }

  @Mutation(() => Asset)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  removeAsset(
    @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  ) {
    return this.assetService.remove(id);
  }

  @Mutation(() => Asset)
  @UseGuards(JwtAuthGuard)
  ownAsset(
    @Args('input') input: BuyAssetInput,
    @Context() context: any
  ) {
    // user JWT claims are available because of JwtAuthGuard
    const user_claims = context.req.user;
    return this.assetService.ownAsset(input, user_claims.sub);
  }
}
