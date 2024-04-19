import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ChangeOrderStatusDto, CreateOrdesrDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrdesrsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdesrsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  create(createOrdesrDto: CreateOrdesrDto) {
    return this.order.create({
      data: createOrdesrDto,
    });
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const totalPages = await this.order.count({
      where: {
        //esto filtra por el status
        status: orderPaginationDto.status,
      },
    });

    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status,
        },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    };
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: { id },
    });

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${id} not found`,
      });
    }

    return order;
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status: status },
    });
  }
}
