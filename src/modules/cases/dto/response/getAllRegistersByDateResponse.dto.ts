import { Cases } from '../../cases.entity';

export class GetAllRegistersByDateResponseDto {
  variant: string;
  data: DataResponse[];
}

export class DataResponse {
  location: string;
  registers: Cases[];
}
