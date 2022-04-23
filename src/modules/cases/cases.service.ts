import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from './cases.entity';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private readonly repository: Repository<Cases>,
  ) {}

  async getAllRegistersByDate(date: string) {
    const result: Cases[] = await this.repository.find({ date });
    const groupedResultByLocation = this.groupByProperty(result, 'variant');
    const test = Object.entries(groupedResultByLocation).map(
      ([variant, data]) => ({
        variant,
        data,
      }),
    );

    test.forEach((t) => {
      const testGroup = this.groupByProperty(t.data, 'location');
      t.data = Object.entries(testGroup).map(([location, registers]) => ({
        location,
        registers,
      })) as any;
    });

    return test;
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
