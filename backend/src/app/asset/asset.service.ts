import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model, Schema as MongooSchema, ObjectId } from 'mongoose';
import { CANNOT_PURCHASE_MORE_THAN_ONE_COPY_EXCEPTION } from '../common/exceptions/user.exceptions';
import { BuyAssetInput } from './dto/buy-asset.input';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { Asset, AssetDocument } from './entities/asset.entity';
import { log } from 'console';
import {  GraphQLJSONObject } from 'graphql-type-json';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset.name)
    private assetModel: Model<AssetDocument>,
  ) {}

  create(input: CreateAssetInput) {
    const asset = new this.assetModel(input);
    return asset.save();
  }

  async findAll(limit: number, skip: number, filters: object) {
    // const tags_filter = tags?.length ? {
    //   "tags": {
    //     "$in": tags
    //   }
    // } : {};

    const count = await this.assetModel.find(filters).countDocuments();
    const assets = await this.assetModel
      .find(filters)
      .populate('owner')
      .skip(skip)
      .limit(limit)
      .sort({ "updatedAt" : -1 })

    return {
      assets,
      count,
    };
  }

  byId(
    id: MongooSchema.Types.ObjectId
  ) {
    return this.assetModel
      .findById(id)
      .populate('owner')
  }

  update(
    id: MongooSchema.Types.ObjectId,
    input: UpdateAssetInput,
  ) {
    return this.assetModel.findByIdAndUpdate(id, input, { new: true });
  }

  remove(id: MongooSchema.Types.ObjectId) {
    return this.assetModel.deleteOne({ _id: id });
  }

  async ownAsset(input: BuyAssetInput, userId: string) {
      // This is an ACID transaction
      const oid = new Types.ObjectId(userId)
      const result = await this.assetModel.findOneAndUpdate(
        { _id: input.assetId},
        [
          {
            $set:       
            {
              owner: {
                $ifNull: [
                  "$owner",
                  oid,
                  null
                ]  
              }
            }        
          }
        ],
        {
          new: true
        }
      )
      .populate('owner')

      // {
      //   $ifNull: [
      //     "$owner",
      //     oid,
      //     null
      //   ]
      // }
      log('userId ', userId)
      // log('result.owner._id.path ', result.owner._id)
      log('result ', result)
      const succeeded = result.owner._id.toString() === userId

      if(!succeeded)
        throw new Error('Asset is owned by someone else')

      return result
  }
}
