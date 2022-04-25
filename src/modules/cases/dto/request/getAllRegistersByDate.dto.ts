import { PickType } from '@nestjs/swagger';
import { Cases } from '../../cases.entity';

export class GetAllRegistersByDateDto extends PickType(Cases, ['date']) {}
