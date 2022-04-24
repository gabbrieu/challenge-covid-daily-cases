import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Cases } from '../../cases/cases.entity';
import { GetAllRegistersByDateResponseDto } from '../../cases/dto/response/getAllRegistersByDateResponse.dto';

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
