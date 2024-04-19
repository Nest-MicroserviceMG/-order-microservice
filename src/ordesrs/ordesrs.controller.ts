import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdesrsService } from './ordesrs.service';
import { CreateOrdesrDto } from './dto/create-ordesr.dto';
import { UpdateOrdesrDto } from './dto/update-ordesr.dto';

@Controller()
export class OrdesrsController {
  constructor(private readonly ordesrsService: OrdesrsService) {}

  @MessagePattern('createOrdesr')
  create(@Payload() createOrdesrDto: CreateOrdesrDto) {
    return this.ordesrsService.create(createOrdesrDto);
  }

  @MessagePattern('findAllOrdesrs')
  findAll() {
    return this.ordesrsService.findAll();
  }

  @MessagePattern('findOneOrdesr')
  findOne(@Payload() id: number) {
    return this.ordesrsService.findOne(id);
  }
}
