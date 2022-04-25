import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from './modules/cases/cases.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cases) private readonly repository: Repository<Cases>,
  ) {}

  getChallengeMessage(): string {
    return 'Backend Challenge 2022 🏅 - Covid Daily Cases';
  }

  async getAllDates(): Promise<string[]> {
    const datesObject = await this.repository
      .createQueryBuilder('c')
      .select('c.date::varchar', 'date')
      .distinct(true)
      .cache(true)
      .getRawMany();

    return datesObject.map((obj) => obj.date);
  }
}
