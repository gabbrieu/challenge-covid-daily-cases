import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetCasesSumByDate } from '../commom/types/types';
import { Cases } from './cases.entity';
import {
  DataResponse,
  GetAllRegistersByDateResponseDto,
} from './dto/response/getAllRegistersByDateResponse.dto';
import {
  GetRegistersByDateAndSumNumberOfCasesResponseDto,
  SumDataResponse,
} from './dto/response/getRegistersByDateAndSumNumberOfCasesResponse.dto';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private readonly repository: Repository<Cases>,
  ) {}

  async getAllRegistersByDate(
    date: string,
  ): Promise<GetAllRegistersByDateResponseDto[]> {
    const result: Cases[] = await this.repository.find({
      cache: true,
      where: { date },
    });

    const resultSplittedByVariant = await this.getResultSplittedByVariant(
      result,
    );

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

  private getResultSplittedByVariant(result: any): any {
    const resultGroupedByVariant = this.groupByProperty(result, 'variant');
    return Object.entries(resultGroupedByVariant).map(([variant, data]) => ({
      variant,
      data,
    })) as any;
  }

  private groupByProperty<T extends Record<string, any>, K extends keyof T>(
    array: T[],
    key: K | { (obj: T): string },
  ): Record<string, T[]> {
    // istanbul ignore next
    const keyFn = key instanceof Function ? key : (obj: T) => obj[key];
    return array.reduce((objectsByKeyValue, obj) => {
      const value = keyFn(obj);
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {} as Record<string, T[]>);
  }

  async getRegistersByDateAndSumNumberOfCases(
    date: string,
  ): Promise<GetRegistersByDateAndSumNumberOfCasesResponseDto[]> {
    const result = await this.repository
      .createQueryBuilder('c')
      .select('c.variant', 'variant')
      .addSelect('c.location', 'location')
      .addSelect('SUM(c.num_sequences) as total')
      .where(`date BETWEEN '2020-05-11' AND :date`, { date })
      .groupBy('c.location')
      .addGroupBy('c.variant')
      .cache(true)
      .getRawMany<IGetCasesSumByDate>();

    const resultSplittedByVariant = this.getResultSplittedByVariant(result);

    resultSplittedByVariant.forEach((r) => {
      const resultGroupedByLocation = this.groupByProperty(r.data, 'location');
      r.data = Object.entries(resultGroupedByLocation).map(
        ([location, registers]) => ({
          location,
          totalCasesUntilDate: Number(registers[0].total),
        }),
      ) as SumDataResponse[];
    });

    return resultSplittedByVariant as GetRegistersByDateAndSumNumberOfCasesResponseDto[];
  }
}
