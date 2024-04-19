import { Module } from '@nestjs/common';
import { OrdesrsService } from './ordesrs.service';
import { OrdesrsController } from './ordesrs.controller';

@Module({
  controllers: [OrdesrsController],
  providers: [OrdesrsService],
})
export class OrdesrsModule {}
