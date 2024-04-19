import { Module } from '@nestjs/common';
import { OrdesrsModule } from './ordesrs/ordesrs.module';

@Module({
  imports: [OrdesrsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
