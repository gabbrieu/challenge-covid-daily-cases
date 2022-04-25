import { Repository, SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cases } from '../../cases/cases.entity';
import { GetAllRegistersByDateResponseDto } from '../../cases/dto/response/getAllRegistersByDateResponse.dto';
import { GetRegistersByDateAndSumNumberOfCasesResponseDto } from '../../cases/dto/response/getRegistersByDateAndSumNumberOfCasesResponse.dto';
import { IGetCasesSumByDate } from '../types/types';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findOneOrFail: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    createImage: jest.fn((entity) => entity),
    preload: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    findAndCount: jest.fn((entity) => entity),
    createQueryBuilder: jest.fn((entity) => entity),
    query: jest.fn((entity) => entity),
  }),
);

// @ts-ignore
export const selectQueryBuilderMock: () => SelectQueryBuilder<any> = jest.fn(
  () => ({
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    addGroupBy: jest.fn().mockReturnThis(),
    cache: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
    getRawOne: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    setParameters: jest.fn().mockReturnThis(),
    setParameter: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    clone: jest.fn().mockReturnThis(),
    distinct: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockImplementation(() => Promise.resolve([])),
    getRawMany: jest.fn().mockImplementation(() => Promise.resolve([])),
  }),
);

export const registerMock = {
  id: uuidv4(),
  date: '2022-04-22',
  location: 'Brazil',
  numSequences: 3,
  numSequencesTotal: 3,
  percSequences: 100,
  variant: 'Delta',
} as Cases;

export const registerMock2 = {
  id: uuidv4(),
  date: '2022-04-22',
  location: 'Angola',
  numSequences: 1,
  numSequencesTotal: 1,
  percSequences: 100,
  variant: 'Delta',
} as Cases;

export const registerMock3 = {
  id: uuidv4(),
  date: '2022-04-22',
  location: 'Brazil',
  numSequences: 10,
  numSequencesTotal: 10,
  percSequences: 100,
  variant: 'Alpha',
} as Cases;

export const registerMock4 = {
  id: uuidv4(),
  date: '2022-04-22',
  location: 'Angola',
  numSequences: 20,
  numSequencesTotal: 20,
  percSequences: 100,
  variant: 'Alpha',
} as Cases;

export const getRegistersResponseMock: GetAllRegistersByDateResponseDto[] = [
  {
    variant: 'Delta',
    data: [
      { location: 'Brazil', registers: [registerMock] },
      { location: 'Angola', registers: [registerMock2] },
    ],
  },
  {
    variant: 'Alpha',
    data: [
      { location: 'Brazil', registers: [registerMock3] },
      { location: 'Angola', registers: [registerMock4] },
    ],
  },
];

export const getSumQueryResponseMock: IGetCasesSumByDate = {
  location: 'Brazil',
  total: 2,
  variant: 'Beta',
};

export const getSumQueryResponseMock2: IGetCasesSumByDate = {
  location: 'Angola',
  total: 10,
  variant: 'Beta',
};

export const getSumQueryResponseMock3: IGetCasesSumByDate = {
  location: 'Brazil',
  total: 50,
  variant: 'Alpha',
};

export const getSumQueryResponseMock4: IGetCasesSumByDate = {
  location: 'Angola',
  total: 6,
  variant: 'Alpha',
};

export const getSumFinalResponseMock: GetRegistersByDateAndSumNumberOfCasesResponseDto[] =
  [
    {
      variant: 'Beta',
      data: [
        { location: 'Brazil', totalCasesUntilDate: 2 },
        { location: 'Angola', totalCasesUntilDate: 10 },
      ],
    },
    {
      variant: 'Alpha',
      data: [
        { location: 'Brazil', totalCasesUntilDate: 50 },
        { location: 'Angola', totalCasesUntilDate: 6 },
      ],
    },
  ];
