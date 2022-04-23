import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from './cases.entity';
import {
  DataResponse,
  GetAllRegistersByDateResponseDto,
} from './dto/response/getAllRegistersByDateResponse.dto';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private readonly repository: Repository<Cases>,
  ) {}

  async getAllRegistersByDate(
    date: string,
  ): Promise<GetAllRegistersByDateResponseDto[]> {
    const result: Cases[] = await this.repository.find({ date });
    const resultGroupedByVariant = this.groupByProperty(result, 'variant');
    const resultSplittedByVariant = Object.entries(resultGroupedByVariant).map(
      ([variant, data]) => ({
        variant,
        data,
      }),
    ) as any;

    resultSplittedByVariant.forEach((r) => {
      const resultGroupedByLocation = this.groupByProperty(r.data, 'location');
      r.data = Object.entries(resultGroupedByLocation).map(
        ([location, registers]) => ({
          location,
          registers,
        }),
      ) as DataResponse[];
    });

    return resultSplittedByVariant as GetAllRegistersByDateResponseDto[];
  }

  private groupByProperty<T extends Record<string, any>, K extends keyof T>(
    array: T[],
    key: K | { (obj: T): string },
  ): Record<string, T[]> {
    const keyFn = key instanceof Function ? key : (obj: T) => obj[key];
    return array.reduce((objectsByKeyValue, obj) => {
      const value = keyFn(obj);
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {} as Record<string, T[]>);
  }
}
