import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetResolver } from './asset.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './entities/asset.entity';

@Module({
  providers: [AssetResolver, AssetService],
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
  ],
})
export class AssetModule {}
