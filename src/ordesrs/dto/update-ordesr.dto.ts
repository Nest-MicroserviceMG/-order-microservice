import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdesrDto } from './create-ordesr.dto';

export class UpdateOrdesrDto extends PartialType(CreateOrdesrDto) {
  id: number;
}
