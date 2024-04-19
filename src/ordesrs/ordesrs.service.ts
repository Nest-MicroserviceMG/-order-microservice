import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrdesrDto } from './dto/create-ordesr.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrdesrsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdesrsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  create(createOrdesrDto: CreateOrdesrDto) {
    return 'This action adds a new ordesr';
  }

  findAll() {
    return `This action returns all ordesrs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordesr`;
  }
}
