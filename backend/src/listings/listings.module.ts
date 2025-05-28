import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
