import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdesrsService } from './ordesrs.service';
import { CreateOrdesrDto } from './dto/create-ordesr.dto';
import { UpdateOrdesrDto } from './dto/update-ordesr.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto';

@Controller()
export class OrdesrsController {
  constructor(private readonly ordesrsService: OrdesrsService) {}

  @MessagePattern('createOrdesr')
  create(@Payload() createOrdesrDto: CreateOrdesrDto) {
    return this.ordesrsService.create(createOrdesrDto);
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() orderPaginationDto: OrderPaginationDto) {
    return this.ordesrsService.findAll(orderPaginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordesrsService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordesrsService.changeStatus(changeOrderStatusDto);
  }
}
