import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AppService } from '../app.service';
import { Cases } from '../modules/cases/cases.entity';
import {
  MockType,
  repositoryMockFactory,
  selectQueryBuilderMock,
} from '../modules/commom/mock';

describe('AppService', () => {
  let service: AppService;
  let repository: MockType<Repository<Cases>>;
  let selectQueryBuilder: SelectQueryBuilder<any>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Cases),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    selectQueryBuilder = selectQueryBuilderMock();
    service = module.get<AppService>(AppService);
    repository = module.get(getRepositoryToken(Cases));

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(selectQueryBuilder);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('getChallengeMessage', () => {
    it('should return the challenge message', () => {
      expect(service.getChallengeMessage()).toEqual(
        'Backend Challenge 2022 🏅 - Covid Daily Cases',
      );
    });
  });

  describe('getAllDates', () => {
    it('should return all dates', async () => {
      jest
        .spyOn(selectQueryBuilder, 'getRawMany')
        .mockResolvedValue([{ date: '2022-04-24' }, { date: '2022-04-23' }]);

      const response = await service.getAllDates();
      expect(selectQueryBuilder.select).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.distinct).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.cache).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.getRawMany).toHaveBeenCalledTimes(1);
      expect(response).toBeDefined();
      expect(response.length).toEqual(2);
      expect(response).toMatchObject(['2022-04-24', '2022-04-23']);
    });
  });
});
